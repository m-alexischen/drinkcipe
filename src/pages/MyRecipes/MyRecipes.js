import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMyRecipes } from '../../components/lib/api';
import RecipeItem from '../Recipes/components/item/RecipeItem';
import classes from './MyRecipes.module.css';


const MyRecipes = () => {
    const [allMyRecipes, setAllMyRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllMyRecipes().then(res => setAllMyRecipes(res));
    }, []);

    if (allMyRecipes === null) {
        return <h2>NO DRINK-CIPE FOUND</h2>;
    };

    const buttonHandler = () => {
        navigate('/my-recipes/add-your-twist');
    };

    return (
        <section className={classes.section}>
            <h1>My DRINK-CIPEs</h1>
            <div className={classes.row}>
                <span>Start Adding Your Twist!</span>
                <button type='button' onClick={buttonHandler}>+</button>
            </div>
            <ul className={classes.list}>
                {(allMyRecipes !== undefined) ?
                    allMyRecipes.map((recipe) => (
                        <RecipeItem
                            key={recipe.id}
                            id={recipe.id}
                            drinkName={recipe.name}
                            bartender={recipe.author.username}
                        />
                    )) : 'Start adding DRINK-CIPE!'
                }
            </ul>
        </section>
    );
};

export default MyRecipes;