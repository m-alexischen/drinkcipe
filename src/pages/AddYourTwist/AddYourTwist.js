import { useNavigate } from 'react-router-dom';
import RecipeForm from '../Recipes/components/form/RecipeForm';
import classes from './AddYourTwist.module.css';

const AddYourTwist = () => {
    // const navigate = useNavigate();

    // navigate('/recipes');
    

    return (
        <section className={classes.section}>
            <h1>What's your DRINK-CIPE?</h1>
            <RecipeForm />
        </section>
    );
};

export default AddYourTwist;