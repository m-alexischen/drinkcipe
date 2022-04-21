import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeItem from '../components/item/RecipeItem';
import { showRandomRecipes } from '../../../components/lib/api';
import classes from './Recipes.module.css';

const Recipes = () => {
    const navigate = useNavigate();
    const [randomRecipes, setRandomRecipes] = useState([]);

    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * 100);
        showRandomRecipes(randomNumber).then(res => setRandomRecipes(res));
    }, [])

    const buttonHandler = () => {
        navigate('/my-recipes/add-your-twist');
    };

    return (
        <div>
            <div className={classes.row}>
                <span>Create a DRINK-CIPE!</span>
                <button type='button' onClick={buttonHandler}>+</button>
            </div>
            <ul>
                {randomRecipes.map((recipe) => (
                    <RecipeItem
                        key={recipe.id}
                        id={recipe.id}
                        drinkName={recipe.name}
                        bartender={recipe.author.username}
                    />
                ))}
            </ul>
        </div>
    )
};

export default Recipes;