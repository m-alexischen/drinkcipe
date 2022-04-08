import { Fragment } from 'react';
import RecipeItem from '../item/RecipeItem';
import classes from './RecipeList.module.css';

const RecipeList = (props) => {
  return (
    <Fragment>
      <ul className={classes.list}>
        {props.filtered.map((recipe) => (
          <RecipeItem
            key={recipe.id}
            id={recipe.id}
            drinkName={recipe.drinkName}
            bartender={recipe.bartender}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default RecipeList;
