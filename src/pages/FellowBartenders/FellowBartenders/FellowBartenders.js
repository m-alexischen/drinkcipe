import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteFriend, showFriends } from '../../../components/lib/api';
import Modal from '../../../components/UI/Modal/Modal';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import classes from './FellowBartenders.module.css';

const FellowBartenders = () => {
    const [myFriends, setMyFriends] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const showModalHandler = () => {
        setShowModal(true);
    };
    
    const closeModalHandler = () => {
        setShowModal(false);
    };

    const navSearchHandler = () => {
        navigate('/fellow-bartenders/search');
    };

    const navInviteHandler = () => {
        navigate('/fellow-bartenders/invites');
    };

    useEffect(() => {
        showFriends().then(res => setMyFriends(res));
    }, [])

    const deleteHandler = (id) => {
        deleteFriend(id);

        const updatedFriends = myFriends.filter(friend => friend.id !== id);
        setMyFriends(updatedFriends);
        setShowModal(false);
    };

    return (
        <div>
            <div className={classes.search}>
                <input type='search' placeholder='Search Bartender'onClick={navSearchHandler} />
                <button className='btn' onClick={navInviteHandler}>Check Invite Requests</button>
            </div>
            <div className={classes.container}>
                {(myFriends.length !== 0) ? myFriends.map((bartender) => {
                    return (
                        <div className={classes.item} key={bartender.friendUserId}>
                            <h5>{bartender.friendUserName}</h5>
                            <div className={classes.image}>
                                <img src={bartender.friendUserImageId} alt='' />
                            </div>
                            <button className='btn' onClick={showModalHandler}>
                                UnFriend
                            </button>
                            {showModal && (
                                <Modal 
                                    text='Are you sure?' 
                                    onConfirm={() => deleteHandler(bartender.id)} 
                                    onCancel={closeModalHandler} 
                                />
                            )}
                            {showModal && <Backdrop onCancel={closeModalHandler} />}
                        </div>
                )}) : <h4>Go Send Invitations Out to Make New Friends.</h4>}
            </div>
        </div>
    )
};

export default FellowBartenders;