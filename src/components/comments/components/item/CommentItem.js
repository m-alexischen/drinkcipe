import classes from './CommentItem.module.css';

const CommentItem = (props) => {

  return (
    <li className={classes.item}>
      <figure>
        <figcaption>{props.bartender}</figcaption>
      </figure>
      <p>{props.text}</p>
      {props.showBtn ? (
        <div className={classes.edit}>
          <button onClick={props.onEdit}>Edit</button>
          <span>|</span>
          <button onClick={props.onDelete}>Delete</button>
        </div>) : null
      }
    </li>
  );
};

export default CommentItem;