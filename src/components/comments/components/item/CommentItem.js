import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './CommentItem.module.css';

const CommentItem = (props) => {
  const navigate = useNavigate();

  const [switchBtn, setSwitchBtn] = useState(false);

  const params = useParams();

  const switchBtnHandler = (event) => {
    event.preventDefault();
    setSwitchBtn((prev) => !prev);
  };

  const cancelBtnHandler = (event) => {
    event.preventDefault();

    navigate(`/recipes/${params.recipeId}`);
  };

  return (
    <li className={classes.item}>
      <figure>
        <figcaption>{props.bartender}</figcaption>
      </figure>
      {switchBtn ? (
        <div className={classes.box}>
          <textarea id='comment' rows='2' defaultValue={props.text} onChange={props.onChange} />
          <span>{props.rating}</span>
        </div>
      ) : (
        <div>
          {props.showBtn ? <p>{props.text} {props.myRating}</p> : <p>{props.text}</p>}
        </div>
      )}
      {props.showBtn ? (
        <div className={classes.edit}>
          {switchBtn ? (
            <div className={classes.update}>
              <button onClick={props.onUpdate}>Update</button>
              <span>|</span>
              <button onClick={cancelBtnHandler}>Cancel</button>
            </div>
          ): (
            <button onClick={switchBtnHandler}>Edit</button>
          )}
          <span>|</span>
          <button onClick={props.onDelete}>Delete</button>
        </div>) : null
      }
    </li>
  );
};

export default CommentItem;