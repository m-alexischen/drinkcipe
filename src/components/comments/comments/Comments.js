import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { deleteComment, getAllComments } from '../../lib/api';
import NewCommentForm from '../components/form/NewCommentForm';
import CommentItem from '../components/item/CommentItem';
import classes from './Comments.module.css';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [allComments, setAllComments] = useState([]);

  const params = useParams();
  const userId = localStorage.getItem('userId');

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  useEffect(() => {
    getAllComments(params.recipeId).then(comments => {    
      for (let i = 0; i < comments.length ; i++) {
        const id = comments[i].userId+'';

        if (id === userId) {
          comments[i]['showBtn'] = true;
        } else {
          comments[i]['showBtn'] = false;
        }
      };

      setAllComments(comments);
    });
  }, [params]);

  const deleteHandler = (event) => {
    event.preventDefault();

    // deleteComment(params.recipeId, {
    //   recipeId: params.recipeId,
    //   userId: userId,
    //   commentId: commentId
    // })
  };
  
  return (
    <section className={classes.comments}>
      <h2>Bartenders Comments</h2>
      {isAddingComment && <NewCommentForm />}
      {!isAddingComment && (
        <div>
          {allComments.map((comment) => (
            <CommentItem 
              key={comment.comment.id}
              text={comment.comment.content}
              bartender={comment.userName}
              showBtn={comment.showBtn}
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
