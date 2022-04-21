import { useState, useEffect } from 'react';
import { showRandomRecipes } from '../../components/lib/api';
import RecipeItem from '../Recipes/components/item/RecipeItem';
import classes from './StartingPage.module.css';

const StartingPage = () => {
    const [randomRecipes, setRandomRecipes] = useState([]);

    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * 100);
        showRandomRecipes(randomNumber).then(res => setRandomRecipes(res));
    }, [])

    return (
        <section className={classes.starting}>
            <h1>Make Your Own Drinks!</h1>
            <ul className={classes.item}>
                {randomRecipes.map((recipe) => (
                    <RecipeItem
                        key={recipe.id}
                        id={recipe.id}
                        drinkName={recipe.name}
                        bartender={recipe.author.username}
                    />
                ))}
            </ul>
        </section>
    );
};

export default StartingPage;