import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeItem from '../components/item/RecipeItem';
import { showRandomRecipes } from '../../../components/lib/api';
import { getImageURL } from '../../../components/images/getImage/GetImageURL';
import LoadingPic from '../../../components/images/components/loading.jpeg';
import classes from './Recipes.module.css';

const Recipes = () => {
    const navigate = useNavigate();
    const [randomRecipes, setRandomRecipes] = useState([]);
    const [showPic, setShowPic] = useState();

    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * 100);
        showRandomRecipes(randomNumber).then(recipes => {
            setRandomRecipes(recipes);

            for (let i = 0; i < recipes.length ; i++) {
                if (recipes[i].imageIds.length === 0) {
                    setShowPic(LoadingPic);
                } else if (recipes[i].imageIds.length > 0) {
                    for (let n = 0; n < recipes[i].imageIds.length ; i++){
                        const id = recipes[i].imageIds[n].imageId;
    
                        setShowPic(getImageURL(id));
                    }
                };
            }
        });
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
            <div className={classes.container}>
                {randomRecipes.map((recipe) => (
                    <RecipeItem
                        key={recipe.id}
                        id={recipe.id}
                        drinkName={recipe.name}
                        bartender={recipe.author.username}
                        image={showPic}
                    />
                ))}
            </div>
        </div>
    )
};

export default Recipes;