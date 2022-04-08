import classes from './MarkedRecipe.module.css';

const MarkedRecipe = (props) => {
  return (
    <div className={classes.recipe}>
      <h2>{props.drinkName}</h2>
      <hr />
      <h3>{props.bartender}</h3>
      <h4>Ingredients</h4>
      <h5>{props.making}</h5>
    </div>
  );
};

export default MarkedRecipe;
