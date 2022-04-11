import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import { login, signup } from '../../components/lib/api';
import classes from './Login.module.css';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confrimPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

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
        setIsSignUp((prevState) => !prevState);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setIsLoading(true);

        if (!isSignUp) {
            login({
                email: email,
                password: password,
            }).then((data) => {
                ctx.login(data);
                navigate('/');
            })
            .catch((err) => {
                alert(err.message);
            });
            setIsLoading(false);
        } else {
            if (confrimPassword !== password) {
                let errorMessage = 'Authentication failed!';
                return alert(errorMessage);
                setIsLoading(false);
            };

            signup({
                username: username,
                email: email,
                password: password,
                role: ['ROLE_USER'],
            }).then((data) => {
                alert('Sign Up Successfully!');
                setIsLoading(false);
            });
        };
    };

    return (
        <section className={classes.auth}>
            <h1>{!isSignUp ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                {isSignUp && (
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
                        minLength='6'
                        onChange={passwordChangeHandler}
                    />
                </div>
                {isSignUp && (
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
                    {!isLoading && (<button>{!isSignUp ? 'Login' : 'Create Account'}</button>)}
                    {isLoading && <p>Sending request...</p>}
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {!isSignUp ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Login;