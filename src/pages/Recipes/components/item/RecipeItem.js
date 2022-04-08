import { Link } from 'react-router-dom';
import classes from './RecipeItem.module.css';

const RecipeItem = (props) => {
  return (
    <li className={classes.item}>
      <figure>
        <figcaption>{props.drinkName}</figcaption>
        <p>{props.bartender}</p>
      </figure>
      <Link className='btn' to={`/recipes/${props.id}`}>
        View
      </Link>
    </li>
  );
};

export default RecipeItem;
