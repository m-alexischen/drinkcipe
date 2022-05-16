import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipesByUserId } from "../../../../components/lib/api";
import { getImageURL } from '../../../../components/images/getImage/GetImageURL';
import LoadingPic from '../../../../components/images/components/loading.jpeg';
import RecipeItem from "../../components/item/RecipeItem";
import classes from './UserRecipes.module.css';

const UserRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [username, setUsername] = useState();
    const [userImage, setUserImage] = useState();
    const [showPic, setShowPic] = useState();
    const params = useParams();

    useEffect(() => {
        getRecipesByUserId(params.userId).then(recipes => {
            setUsername(recipes[0].author.username);

            if (recipes[0].author.userImage !== null) {
                setUserImage(getImageURL(recipes[0].author.userImage.imageId));
            };

            setRecipes(recipes);

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
    }, []);

    return (
        <div className={classes.container}>
            <h1><img className={classes.userImg} src={userImage} alt='' /> {username}</h1>
            <br />
            {(recipes.length !== 0) ? recipes.map((recipe) => {
                return (
                    <div key={recipe.id}>
                        <RecipeItem
                            id={recipe.id}
                            drinkName={recipe.name}
                            bartender={recipe.author.username}
                            image={showPic}
                        />
                    </div>
                    
            )}) : <h4>No Notifications At The Moment.</h4>}
        </div>
    )
};

export default UserRecipes;