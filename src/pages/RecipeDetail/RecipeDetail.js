import { Outlet, useLocation, useParams } from 'react-router-dom';
import { Fragment, useState, useEffect } from 'react';
import MarkedRecipe from './components/marked/MarkedRecipe';
import { getItemsOfRecipe, getSingleRecipe } from '../../components/lib/api';

const RecipeDetail = () => {
    const [singleRecipe, setSingleRecipe] = useState();
    const [making, setMaking] = useState([]);

    // const params = useParams();

    // useEffect(() => {
    //     getSingleRecipe(params.recipeId).then(res => setSingleRecipe(res));
    //     getItemsOfRecipe(params.recipeId).then(res => setMaking(res));
    // }, []);

    const { state } = useLocation();

    useEffect(() => {
        // TODO: use cache recipe data if recipe data is null refectch data with params id 
        if (state) {
            getSingleRecipe(state).then(res => setSingleRecipe(res));
            getItemsOfRecipe(state).then(res => setMaking(res));
        }
    }, [state]);

    return(
        <Fragment>
            {(singleRecipe !== undefined) ? 
                <MarkedRecipe 
                    drinkName={singleRecipe.name} 
                    bartender={singleRecipe.author.username} 
                    making={making.map(({ingredient, volume, unit}) => (
                        <li key={ingredient}>{ingredient} {volume} {unit}</li>
                    ))} 
                />
            : 'NO DRINK-CIPE FOUND!'}
            <Outlet />
        </Fragment>
    )
};

export default RecipeDetail;