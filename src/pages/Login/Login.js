import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './Login.module.css';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confrimPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const ctx = useContext(AuthContext);

    const usernameChangeHandler = (event) => {
        event.preventDefault();
        setUsername(event.target.value);
    };
    
    const emailChangeHandler = (event) => {
        event.preventDefault();
        setEmail(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        event.preventDefault();
        setPassword(event.target.value);
    };

    const confirmPasswordChangeHandler = (event) => {
        event.preventDefault();
        setConfirmPassword(event.target.value);
    };

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const dataFetchHandler = (url, params) => {
            fetch(url, params).then((res) => {
                setIsLoading(false);
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then((data) => {
                        let errorMessage = 'Authentication failed!';
                        
                        throw new Error(errorMessage);
                    });
                };
            }).then((data) => {
                const expirationTime = new Date((new Date().getTime() + (+data.expiresIn * 1000)));
                ctx.login(data.idToken, expirationTime.toISOString());
                navigate('/');
            })
            .catch((err) => {
                alert(err.message);
            });
        };

        setIsLoading(true);
        
        if (isLogin) {
            dataFetchHandler('http://localhost:8080/api/auth/signin', {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            if (confrimPassword !== password) {
                let errorMessage = 'Authentication failed!';
                return alert(errorMessage);
            };

            dataFetchHandler('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                    role: ['ROLE_USER'],
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        };
    };

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                {!isLogin && (
                    <div className={classes.control}>
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            name='username'
                            value={username}
                            minLength='2'
                            required
                            onChange={usernameChangeHandler}
                        />
                    </div>
                )}
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input 
                        type='email' 
                        name='email' 
                        value={email}
                        required 
                        onChange={emailChangeHandler}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input
                        type='password'
                        name='password'
                        value={password}
                        required
                        onChange={passwordChangeHandler}
                    />
                </div>
                {!isLogin && (
                    <div className={classes.control}>
                        <label htmlFor='password'>Confirm Password</label>
                        <input
                            type='password'
                            name='confirmPassword'
                            required
                            onChange={confirmPasswordChangeHandler}
                        />
                    </div>
                )}
                <div className={classes.actions}>
                    {!isLoading && (<button>{isLogin ? 'Login' : 'Create Account'}</button>)}
                    {isLoading && <p>Sending request...</p>}
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Login;