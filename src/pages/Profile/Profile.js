import { NavLink } from "react-router-dom";
import { userProfile } from "../../components/lib/api";
import classes from './Profile.module.css';

const Profile = () => {
    const username = localStorage.getItem('username');

    userProfile();

    return (
        <div>
            <div className={classes.header}>
                Hello, {username}!
            </div>
            <NavLink to='/profile/edit-info'>
                <button className={classes.button}>
                    Edit Info
                </button> 
            </NavLink>
            <p>You have 4 recipes published!</p>
        </div>
    );
};

export default Profile;