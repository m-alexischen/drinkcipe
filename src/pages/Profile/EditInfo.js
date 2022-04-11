import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { passwordUpdate, dataUpdate } from '../../components/lib/api';
import ToggleSwitch from '../../components/UI/Toggle/ToggleSwitch';
import classes from './EditInfo.module.css';

const EditInfo = () => {
    const navigate = useNavigate();
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [follow, setFollow] = useState(true);

    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    const newUsernameChangeHandler = (event) => {
        event.preventDefault();
        setNewUsername(event.target.value);
    };

    const newPasswordChangeHandler = (event) => {
        event.preventDefault();
        setNewPassword(event.target.value);
    };

    const confirmNewPasswordChangeHandler = (event) => {
        event.preventDefault();
        setConfirmNewPassword(event.target.value);
    };
    
    const switchFollowModeHandler = () => {
        setFollow((prevState) => !prevState);

        dataUpdate({
            id: userId,
            roles: [
                {
                    id: userId,
                    name: 'ROLE_USER'
                }
            ],
            username: username,
            email: email,
            allowFollow: follow
        });
    };

    const usernameUpdateHandler = (event) => {
        event.preventDefault();

        dataUpdate({
            id: userId,
            roles: [
                {
                    id: userId,
                    name: 'ROLE_USER'
                }
            ],
            username: newUsername,
            email: email,
            allowFollow: follow
        }).then(res => {
            alert('Update Successfully!');
            navigate('/profile');
        });
    };

    const passwordUpdateHandler = (event) => {
        event.preventDefault();

        if (confirmNewPassword !== newPassword) {
            let errorMessage = 'Please try again!';
            return alert(errorMessage);
        };

        passwordUpdate({
            userId: userId,
            password: newPassword,
            confirmedPassword: confirmNewPassword,
        }).then(res => {
            alert('Update Successfully!');
            navigate('/profile');
        });
    };

    const cancelUpdateHandler = () => {
        navigate('/profile');
    };

    return (
        <section className={classes.profile}>
            <h1>Update Your Profile</h1>
            <form className={classes.form}>
                <div className={classes.control}>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='text'
                        name='username'
                        id='username'
                        value={newUsername}
                        minLength='3'
                        onChange={newUsernameChangeHandler}
                    />
                    <button className={classes.btn} onClick={usernameUpdateHandler}>Update</button>
                </div>
                <p />
                <div className={classes.control}>
                    <label htmlFor='password'>New Password</label>
                    <input 
                        type='password' 
                        name='password'
                        value={newPassword} 
                        minLength="7" 
                        onChange={newPasswordChangeHandler}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Confirm Password</label>
                    <input 
                        type='password' 
                        name='confirmedpassword' 
                        minLength="7" 
                        onChange={confirmNewPasswordChangeHandler}
                    />
                    <button className={classes.btn} onClick={passwordUpdateHandler}>Update</button>
                </div>
                <p />
                <ToggleSwitch label='Private Account' onChange={switchFollowModeHandler} />
                <p />
                <button className={classes.button} type='button' onClick={cancelUpdateHandler}>Cancel</button>
            </form>
        </section>
        
    );
};

export default EditInfo;