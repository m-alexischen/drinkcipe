import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { userProfile } from "../../components/lib/api";
import classes from './Profile.module.css';

const Profile = () => {
    const [username, setUsername] = useState(null);
    const [selectedPic, setSelectedPic] = useState('https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png');

    useEffect(() => {
        userProfile().then(res => {
            setUsername(res.username);
        });
    }, [username]);

    const pictureSelectedHandler = (event) => {
        setSelectedPic(URL.createObjectURL(event.target.files[0]));
    };

    return (
        <div className={classes.control}>
            <h1>Hello, {username}!</h1>
            <div className={classes.img}>
                <img alt='profile pic' src={selectedPic} />
                <input type='file' onChange={pictureSelectedHandler} />
            </div>
            <br />
            <NavLink to='/profile/edit-info'>
                <button>Edit Personal Info</button> 
            </NavLink>
        </div>
    );
};

export default Profile;