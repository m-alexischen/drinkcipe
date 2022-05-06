import { useState, useEffect } from 'react';
import { acceptRequest, cancelRequest, checkMyInvites, checkRecivedInvites, rejectRequest } from '../../../components/lib/api';
import classes from './Invitation.module.css';

const Invitation = () => {
    const [myInvites, setMyInvites] = useState([]);
    const [recivedInvites, setRecivedInvites] = useState([]);

    useEffect(() => {
        checkMyInvites().then(res => {
            setMyInvites(res);
        });

        checkRecivedInvites().then(res => {
            setRecivedInvites(res);
        })
    }, [recivedInvites])

    
    return (
        <div className={classes.container}>
            <div className={classes.myInvites}>
                <h2>Invitation Sent</h2>
                {(myInvites.length !== 0) ? myInvites.map((bartender) => {
                    return (
                        <div className={classes.item} key={bartender.id}>
                            <h5>{bartender.toUserName}</h5>
                            <div className={classes.image}>
                                <img src={bartender.toUserImageId} alt='' />
                            </div>
                            <button 
                                className='btn' 
                                onClick={() => cancelRequest(bartender.id)}
                            >
                                Cancel Request
                            </button>
                        </div>
                )}) : <h4>No Outgoing Invitation At The Moment.</h4>}
            </div>
            <div className={classes.recivedInvites}>
                <h2>Invitation Recived</h2>
                {(recivedInvites.length !== 0) ? recivedInvites.map((bartender) => {
                    return (
                        <div className={classes.item} key={bartender.id}>
                            <div className={classes.image}>
                                <img src={bartender.fromUserImageId} alt='' />
                            </div>
                            <h4>{bartender.fromUserName} sent you a request!</h4>
                            <div className={classes.button}>
                                <button 
                                    className='btn' 
                                    onClick={() => acceptRequest(bartender.id)}
                                >
                                    Accept
                                </button>
                                <button 
                                    className='btn' 
                                    onClick={() => rejectRequest(bartender.id)}
                                >
                                    Decline
                                </button>
                            </div>
                        </div>
                )}) : <h4>No Incoming Invitation At The Moment.</h4>}
            </div>
        </div>
    )
};

export default Invitation;