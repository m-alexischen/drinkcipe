import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addComment } from '../../../lib/api';

import classes from './NewCommentForm.module.css';

const NewCommentForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [commentInput, setCommentInput] = useState('');

  const params = useParams();
  const userId = localStorage.getItem('userId');

  const navigate = useNavigate();

  const updateCommentHandler = (event) => {
    event.preventDefault();
    setCommentInput(event.target.value);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (commentInput === '' || rating === 0) {
      alert('Please share your opinion and give out rating!');
      return;
    } else {
      addComment(params.recipeId, {
        recipeId: params.recipeId,
        userId: userId,
        content: commentInput
      }).then((res) => {
        navigate(`/recipes/${params.recipeId}`);
      })
    };
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control}>
        <label htmlFor='comment'>Your thoughts?</label>
        <textarea id='comment' rows='3' onChange={updateCommentHandler} />
        <div className={classes.rating}>
          <mark>Rate this DRINK-CIPE</mark>
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type='button'
                key={index}
                className={index <= (hover || rating) ? classes.on : classes.off}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                <span className='star'>&#9733;</span>
              </button>
            );
          })}
          <mark>{rating} of 5 stars</mark>
        </div>
      </div>
      <div className={classes.actions}>
        <button className='btn' onClick={submitFormHandler}>Publish</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
