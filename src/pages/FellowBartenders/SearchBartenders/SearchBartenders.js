import { useState } from 'react';
import searchBtn from '../../../components/images/components/search.png';
import { friendRequest, searchUser } from '../../../components/lib/api';
import OkModal from '../../../components/UI/Modal/OkModal';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import classes from './SearchBartenders.module.css';

const SearchBartenders = () => {
    const [searchInput, setsearchInput] = useState('');
    const [bartenders, setBartenders] = useState([]);
    const [showModal, setShowModal] = useState(false);

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
                {(bartenders !== undefined) ? bartenders.map((bartender) => {
                    return (
                        <div className={classes.item} key={bartender.userId}>
                            <h5>{bartender.userName}</h5>
                            <button className='btn' onClick={() => requestHandler(bartender.userId)}>Follow</button>
                        </div>
                    )}) : 'No Bartenders Fond!'}
            </div>
            {showModal && <OkModal text='Request Sent!' btnText='OK' onCancel={closeModalHandler} />}
            {showModal && <Backdrop onCancel={closeModalHandler} />}
        </div>
        
    )
};

export default SearchBartenders;