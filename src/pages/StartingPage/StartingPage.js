import { useState, useEffect } from 'react';
import { getImageURL } from '../../components/images/getImage/GetImageURL';
import { showRandomRecipes } from '../../components/lib/api';
import LoadingPic from '../../components/images/components/loading.jpeg';
import RecipeItem from '../Recipes/components/item/RecipeItem';
import classes from './StartingPage.module.css';

const StartingPage = () => {
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

    return (
        <section className={classes.starting}>
            <h1>Make Your Own Drinks!</h1>
            <div className={classes.container}>
                {randomRecipes.map((recipe) => (
                    <RecipeItem
                        key={recipe.id}
                        id={recipe.id}
                        drinkName={recipe.name}
                        image={showPic}
                        bartender={recipe.author.username}
                    />
                ))}
            </div>
        </section>
    );
};

export default StartingPage;