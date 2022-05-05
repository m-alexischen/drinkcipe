import { Outlet, useLocation, useParams } from 'react-router-dom';
import { Fragment, useState, useEffect } from 'react';
import LoadingPic from '../../components/images/components/loading.jpeg';
import MarkedRecipe from './components/marked/MarkedRecipe';
import { getItemsOfRecipe, getSingleRecipe } from '../../components/lib/api';
import { getImageURL } from '../../components/images/getImage/GetImageURL';

const RecipeDetail = () => {
    const [singleRecipe, setSingleRecipe] = useState();
    const [making, setMaking] = useState([]);
    const [showPic, setShowPic] = useState();

    const params = useParams();
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        getSingleRecipe(params.recipeId).then(res => {
        
            if (res.author.id+'' === userId) {
                res['showBtn'] = true;
            } else {
                res['showBtn'] = false;
            }

            setSingleRecipe(res);

            if (res.imageIds.length === 0) {
                setShowPic(LoadingPic);
            } else if (res.imageIds.length > 0) {
                for (let i = 0; i < res.imageIds.length ; i++){
                    const id = res.imageIds[i].imageId;

                    setShowPic(getImageURL(id));
                }
            };
        });
        getItemsOfRecipe(params.recipeId).then(res => setMaking(res));
    }, [params, userId]);

    // const { state } = useLocation();

    // useEffect(() => {
    //     // TODO: use cache recipe data if recipe data is null refectch data with params id 
    //     if (state) {
    //         getSingleRecipe(state).then(res => setSingleRecipe(res));
    //         getItemsOfRecipe(state).then(res => setMaking(res));
    //     }
    // }, [state]);

    return(
        <Fragment>
            {(singleRecipe !== undefined) ? 
                <MarkedRecipe 
                    recipeId={params.recipeId}
                    drinkName={singleRecipe.name} 
                    bartender={singleRecipe.author.username}
                    showBtn={singleRecipe.showBtn}
                    image={showPic}
                    making={making.map(({ingredient, volume, unit}) => (
                        <li key={ingredient}>{ingredient} {volume} {unit}</li>
                    ))} 
                    description={singleRecipe.description}
                />
                
            : 'NO DRINK-CIPE FOUND!'}
            <Outlet />
        </Fragment>
    )
};

export default RecipeDetail;