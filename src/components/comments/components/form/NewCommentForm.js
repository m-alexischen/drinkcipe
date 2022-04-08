import { useState } from 'react';

import classes from './NewCommentForm.module.css';

const NewCommentForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [commentInput, setCommentInput] = useState('');

  const updateCommentHandler = (event) => {
    event.preventDefault();
    setCommentInput(event.target.value);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();

    // optional: Could validate here
    if (commentInput === '') {
      alert('Please share your opinion!');
      return;
    };
    // send comment to server
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
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
        <button className='btn'>Publish</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
