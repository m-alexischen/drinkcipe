import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { acceptShare, checkRecivedShare } from '../../components/lib/api';
import classes from './Notification.module.css';

const Notification = () => {
    const [recivedShare, setRecivedShare] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        checkRecivedShare().then(res => {
            setRecivedShare(res);
        })
    }, []);

    const acceptHandler = (id, recipeId) => {
        acceptShare(id);
        navigate(`/recipes/${recipeId}`);
    };

    return (
        <div className={classes.container}>
            <h2>Notification Center</h2>
            <br />
            {(recivedShare.length !== 0) ? recivedShare.map((sharing) => {
                return (
                    <div className={classes.item} key={sharing.id}>
                        <div className={classes.image}>
                            <img src={sharing.recipeImageId} alt='' />
                        </div>
                        <h5>
                            <img src={sharing.fromUserImage} alt='' /> {sharing.fromUserName} shares {sharing.recipeName} with you!
                        </h5>
                        <button className='btn' onClick={() => acceptHandler(sharing.id, sharing.recipeId)}>
                            Accept
                        </button>
                    </div>
            )}) : <h4>No Notifications At The Moment.</h4>}
        </div>
    )
};

export default Notification;