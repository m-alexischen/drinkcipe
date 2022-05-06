import { useNavigate } from "react-router-dom";
import { showFriends } from "../../../components/lib/api";
import classes from './FellowBartenders.module.css';

const FellowBartenders = () => {
    const navigate = useNavigate();

    const navSearchHandler = () => {
        navigate('/fellow-bartenders/search');
    };

    const navInviteHandler = () => {
        navigate('/fellow-bartenders/invites');
    };

    showFriends();

    return (
        <div>
            <div className={classes.search}>
                <input type='search' placeholder='Search Bartender'onClick={navSearchHandler} />
                <button className='btn' onClick={navInviteHandler}>Check Invite Requests</button>
            </div>
        </div>
    )
};

export default FellowBartenders;