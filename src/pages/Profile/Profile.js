import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getImageURL } from '../../components/images/getImage/GetImageURL';
import GetUserImage from '../../components/images/getImage/GetUserImage';
import { addUserImage, userProfile } from '../../components/lib/api';
import classes from './Profile.module.css';

const Profile = () => {
    const [username, setUsername] = useState(null);
    const defaultImage = 'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png';
    const [file, setFile] = useState();
    const [showPic, setShowPic] = useState(defaultImage);

    const token = localStorage.getItem('token');

    useEffect(() => {
        userProfile().then(res => {
            setUsername(res.username);
        });
    }, [username]);
    
    const fileSelectedHandler = (event) => {
        setFile(event.target.files[0]);
    };

    const fileSubmitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        
        if (file.size > 1024 * 1000 * 5){
            alert('size exceeded!');
            return;
        };

        formData.append('file', file);

        const data = { 
            method: 'POST',
            body: formData,
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token,
            },
        };

        addUserImage(data).then(res => {
            setShowPic(getImageURL(res.imageId));
        })
    };


    return (
        <div className={classes.control}>
            <h1>Hello, {username}!</h1>
            <div className={classes.img}>
                <GetUserImage />
                <input type='file' onChange={fileSelectedHandler} />
                {file !== defaultImage ? <button type='submit' onClick={fileSubmitHandler}>Confirm</button> : null}
            </div>
            <br />
            <NavLink to='/profile/edit-info'>
                <button>Edit Personal Info</button> 
            </NavLink>
        </div>
    );
};

export default Profile;