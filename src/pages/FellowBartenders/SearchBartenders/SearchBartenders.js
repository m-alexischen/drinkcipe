import { useState, useEffect } from 'react';
import searchBtn from '../../../components/images/components/search.png';
import { friendRequest, searchUser, showRandomBartenders } from '../../../components/lib/api';
import { getImageURL } from '../../../components/images/getImage/GetImageURL';
import OkModal from '../../../components/UI/Modal/OkModal';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import classes from './SearchBartenders.module.css';
import Invitation from '../Invitation/Invitation';

const SearchBartenders = () => {
    const [searchInput, setsearchInput] = useState('');
    const [bartenders, setBartenders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [randomBartenders, setRandomBartenders] = useState([]);

    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * 100);
        showRandomBartenders(randomNumber).then(res => setRandomBartenders(res));
    }, []);

    const showModalHandler = () => {
        setShowModal(true);
    };
    
    const closeModalHandler = () => {
        setShowModal(false);
    };

    const searchHandler = (event) => {
        event.preventDefault();
        setsearchInput(event.target.value);
    };

    const submitHandler = () => {
        searchUser(searchInput).then(res => {
            setBartenders(res);
        })
    };

    const requestHandler = (userId) => {
        friendRequest(userId);
        showModalHandler();
    };

    return (
        <div>
            <div className={classes.row}>
                <input
                    type='search'
                    placeholder='Search Bartender'
                    value={searchInput}
                    onChange={searchHandler}
                />
                <button onClick={submitHandler}>
                    <img className={classes.search} src={searchBtn} alt='search' />
                </button>
            </div>
            <div className={classes.container}>
                <div className={classes.left}>
                    <h2>Potential Friends</h2>
                    <div className={classes.content}>
                        {(bartenders.length !== 0) ? (
                            bartenders.map((bartender) => {
                                return (
                                    <div className={classes.item} key={bartender.userId}>
                                        <div className={classes.image}>
                                            <img src={getImageURL(bartender.userImageId)} alt='' />
                                            <h5>{bartender.userName}</h5>
                                        </div>
                                        <button className='btn' onClick={() => requestHandler(bartender.userId)}>Friend Request</button>
                                    </div>
                                )
                            })
                        ) : (
                            randomBartenders.map((bartender) => {
                                return (
                                    <div className={classes.item} key={bartender.userId}>
                                        <div className={classes.image}>
                                            <img src={getImageURL(bartender.userImageId)} alt='' />
                                            <h5>{bartender.userName}</h5>
                                        </div>
                                        <button className='btn' onClick={() => requestHandler(bartender.userId)}>Friend Request</button>
                                    </div>
                                )
                            })
                        )}
                        {showModal && <OkModal text='Request Sent!' btnText='OK' onCancel={closeModalHandler} />}
                        {showModal && <Backdrop onCancel={closeModalHandler} />}
                    </div>
                </div>
                <Invitation />
            </div>
        </div>
    )
};

export default SearchBartenders;