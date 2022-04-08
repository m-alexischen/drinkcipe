import { useNavigate } from "react-router-dom";
import RecipeForm from "../Recipes/components/form/RecipeForm";
import classes from './AddYourTwist.module.css';

const AddYourTwist = () => {
    const navigate = useNavigate();

    const addRecipeHandler = (recipedata) => {
        console.log(recipedata);

        navigate('/recipes');
    };

    return (
        <section className={classes.section}>
            <h1>What's your DRINK-CIPE?</h1>
            <RecipeForm onAddRecipe={addRecipeHandler} />
        </section>
    );
};

export default AddYourTwist;