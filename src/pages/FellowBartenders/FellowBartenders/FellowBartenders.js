import { useState } from 'react';
import classes from './FellowBartenders.module.css';

const FellowBartenders = () => {
    const [searchInput, setsearchInput] = useState('');

    const changeHandler = (event) => {
        event.preventDefault();
        setsearchInput(event.target.value);
    };

    // const filteredSearch = DUMMY_DATA.filter((recipe) => (
    //     recipe.drinkName.toLowerCase().includes(searchInput.toLowerCase()) ||
    //     recipe.bartender.toLowerCase().includes(searchInput.toLowerCase())
    // ));

    return (
        <div className={classes.row}>
            <input
                type='search'
                placeholder='Search by Drink Name or Bartender'
                value={searchInput}
                onChange={changeHandler}
            />
        </div>
    )
};

export default FellowBartenders;