import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMyRecipes } from '../../components/lib/api';
import { getImageURL } from '../../components/images/getImage/GetImageURL';
import LoadingPic from '../../components/images/components/loading.jpeg';
import RecipeItem from '../Recipes/components/item/RecipeItem';
import classes from './MyRecipes.module.css';


const MyRecipes = () => {
    const [allMyRecipes, setAllMyRecipes] = useState([]);
    const [showPic, setShowPic] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getAllMyRecipes().then(recipes => {
            for (let i = 0; i < recipes.length ; i++) {
                if (recipes[i].imageIds.length === 0) {
                    setShowPic(LoadingPic);
                } else if (recipes[i].imageIds.length > 0) {
                    for (let n = 0; n < recipes[i].imageIds.length ; i++){
                        const id = recipes[i].imageIds[n].imageId;
                        console.log(recipes[i].imageIds[n])
    
                        setShowPic(getImageURL(id));
                    }
                };
            }

            setAllMyRecipes(recipes);
        });
    }, []);

    if (allMyRecipes === null) {
        return <h2>NO DRINK-CIPE FOUND</h2>;
    };

    const buttonHandler = () => {
        navigate('/my-recipes/add-your-twist');
    };

    const navigateShareHandler = () => {
        navigate('/share');
    };

    return (
        <section className={classes.section}>
            <h1>My DRINK-CIPEs</h1>
            <div>
                <div className={classes.row}>
                    <span>Start Adding Your Twist!</span>
                    <button type='button' onClick={buttonHandler}>+</button>
                    <h4>Or</h4>
                    <span>Check Recipes Shared With You!</span>
                    <button type='button' onClick={navigateShareHandler}>GO</button>
                </div>
            </div>
            <div className={classes.container}>
                {(allMyRecipes !== undefined) ?
                    allMyRecipes.map((recipe) => (
                        <RecipeItem
                            key={recipe.id}
                            id={recipe.id}
                            drinkName={recipe.name}
                            bartender={recipe.author.username}
                            image={showPic}
                        />
                    )) : 'Start adding DRINK-CIPE!'
                }
            </div>
        </section>
    );
};

export default MyRecipes;