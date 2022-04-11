import React, { useCallback, useEffect, useState } from 'react';
import { refreshTokenAPI } from '../components/lib/api';

let logoutTimer;
let refreshTokenTimer;

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
    refreshToken: () => {},
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjExpirationTime - currentTime;

    return remainingDuration;
};

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationTime');

    const remainingTime = calculateRemainingTime(storedExpirationDate);

    if (remainingTime <= 60000){
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    };

    return {
        token: storedToken,
        duration: remainingTime
    };
};

export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();
    let initialToken;
    if (tokenData){
        initialToken = tokenData.token;
    };

    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('refreshToken');

        if (logoutTimer){
            clearTimeout(logoutTimer);
        }
    }, []);

    const loginHandler = (data) => {
        const expirationTime = new Date((new Date().getTime() + (+data.expiresIn * 1000)));
        setToken(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('expirationTime', expirationTime);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('username', data.username);
        localStorage.setItem('email', data.email);

        const remainingTime = calculateRemainingTime(expirationTime);
        localStorage.setItem('remainingTime', remainingTime);

        refreshTokenTimer = setTimeout(refreshTokenHandler, remainingTime);
    };

    const refreshTokenHandler = () => {
        const refreshToken = localStorage.getItem('refreshToken');
        refreshTokenAPI({
            refreshToken: refreshToken,
        }).then((data) => {
            setToken(data.accessToken);
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            const remainingTime = localStorage.getItem('remainingTime');
            refreshTokenTimer = setTimeout(refreshTokenHandler, remainingTime);
        });
    };

    useEffect(() => {
        if (tokenData){
            console.log(tokenData.duration);
            refreshTokenTimer = setTimeout(refreshTokenHandler, tokenData.duration);
        }
    },[tokenData, refreshTokenHandler]);

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        refreshToken: refreshTokenHandler,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;