import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteComment, deleteRating, editComment, editRating, getAllComments, getmyRating } from '../../lib/api';
import NewCommentForm from '../components/form/NewCommentForm';
import CommentItem from '../components/item/CommentItem';
import UserRatings from '../components/rating/UserRatings';
import classes from './Comments.module.css';

const Comments = () => {
  const navigate = useNavigate();
  const [newCommentInput, setNewCommentInput] = useState('');
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [myRating, setMyRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const params = useParams();
  const userId = localStorage.getItem('userId');

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const updateCommentHandler = (event) => {
    event.preventDefault();
    setNewCommentInput(event.target.value);
  };

  useEffect(() => {
    getAllComments(params.recipeId).then(comments => {    
      for (let i = 0; i < comments.length ; i++) {
        const id = comments[i].userId+'';

        if (id === userId) {
          comments[i]['showBtn'] = true;

          getmyRating(params.recipeId).then(rating => {
            setMyRating(rating.star)
          });

        } else {
          comments[i]['showBtn'] = false;
        }
      };

      setAllComments(comments);
    });
  }, [params, userId]);

  const submitCommentHandler = (commentId) => {
    if (newCommentInput === '') {
      alert('Leave no blank space behind!');
      return;
    } else {
      editRating(params.recipeId, {
        star: rating
      })

      editComment(params.recipeId, {
        recipeId: params.recipeId,
        userId: userId,
        commentId: commentId,
        content: newCommentInput
      }).then((res) => {
        navigate(`/recipes/${params.recipeId}`);
      })
    }
  };

  const deleteHandler = (commentId) => {
    deleteRating(params.recipeId);

    deleteComment(params.recipeId, {
      recipeId: params.recipeId,
      userId: userId,
      commentId: commentId
    })

    navigate(`/recipes/${params.recipeId}`);
  };
  
  return (
    <section className={classes.comments}>
      <h2>Bartenders Comments</h2>
      <UserRatings />
      {isAddingComment && <NewCommentForm />}
      {!isAddingComment && (
        <div>
          {allComments.map((comment) => (
            <CommentItem 
              key={comment.comment.id}
              text={comment.comment.content}
              bartender={comment.userName}
              showBtn={comment.showBtn}
              onUpdate={(event) => {
                event.preventDefault();
                submitCommentHandler(comment.comment.id)
              }}
              onChange={updateCommentHandler}
              rating={[...Array(5)].map((star, index) => {
                index += 1;
                return (
                  <div className={classes.rating} key={'rating'+index}>
                    <button
                      type='button'
                      key={'rating'+ index}
                      className={index <= (hover || rating) ? classes.on : classes.off}
                      onClick={() => setRating(index)}
                      onMouseEnter={() => setHover(index)}
                      onMouseLeave={() => setHover(rating)}
                    >
                      <span className='star'>&#9733;</span>
                    </button>
                  </div>
                );
              })}
              myRating={[...Array(myRating)].map((star, index) => {
                index += 1;
                return <span key={'star'+ index}>&#127775;</span>;
              })}
              onDelete={(event) => {
                event.preventDefault();
                deleteHandler(comment.comment.id)
              }}
            />
          ))}
          <button className='btn' onClick={startAddCommentHandler}>
            Add a Comment
          </button>
        </div>
      )}
    </section>
  );
};

export default Comments;