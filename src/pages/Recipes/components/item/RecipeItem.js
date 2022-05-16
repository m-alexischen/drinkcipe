import { Link } from 'react-router-dom';
import classes from './RecipeItem.module.css';

const RecipeItem = (props) => {
  return (
    <div>
      <article className={classes.item}>
        <div className={classes.title}>
          <h3>{props.drinkName}</h3>
          <h5>{props.bartender}</h5>
        </div>
        <img className={classes.pic} src={props.image} alt='drink pic' />
        {/* <Link className='btn' to={`/recipes/${props.id}`}>
          View
        </Link> */}
        <Link className='btn' to={`/recipes/${props.id}`} state={props.id}>
          View
        </Link>
      </article>
    </div>
  );
};

export default RecipeItem;
