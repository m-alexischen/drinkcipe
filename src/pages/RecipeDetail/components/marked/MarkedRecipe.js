import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import editBtn from '../../../../components/images/components/edit.png';
import shareBtn from '../../../../components/images/components/share.png';
import deleteBtn from '../../../../components/images/components/delete.png';
import Modal from '../../../../components/UI/Modal/Modal';
import Backdrop from '../../../../components/UI/Backdrop/Backdrop';
import { deleteRecipe, showFriends, shareRecipe } from '../../../../components/lib/api';
import classes from './MarkedRecipe.module.css';

const MarkedRecipe = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [myFriends, setMyFriends] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    showFriends().then(res => setMyFriends(res));
}, []);

  const showModalHandler = () => {
    setShowModal(true);
  };
  
  const closeModalHandler = () => {
    setShowModal(false);
  };

  const showShareModalHandler = () => {
    setShowShareModal(true);
  };

  const closeShareModalHandler = () => {
    setShowShareModal(false);
  };

  const navigateEditHandler = () => {
    navigate(`/recipes/${props.recipeId}/edit-your-twist`);
  };

  const navigateUserHandler = () => {
    navigate(`/user/${props.userId}`);
  };

  const deleteHandler = () => {
    deleteRecipe(props.recipeId);
    navigate('/recipes');
  };

  const shareHandler = (userId) => {
    shareRecipe(props.recipeId, userId);
    closeShareModalHandler();
  };

  return (
    <div className={classes.recipe}>
      <div className={classes.btn}>
        <h2>{props.drinkName}</h2>
        {props.showBtn ? (
          <div>
            <button><img src={editBtn} alt='edit' onClick={navigateEditHandler} /></button>
            <button><img src={deleteBtn} alt='delete' onClick={showModalHandler} /></button>
            <div className={classes.actions}>
              {showModal && <Modal text='Do you want to permanently delete this DRINK-CIPE?' onConfirm={deleteHandler} onCancel={closeModalHandler} />}
              {showModal && <Backdrop onCancel={closeModalHandler} />}
            </div>
          </div>
        ) : null}
        <button><img src={shareBtn} alt='share' onClick={showShareModalHandler} /></button>
        {showShareModal && (
          <div className={classes.modal}>
            <p>Share with Your Fellow Bartenders</p>
            <div className={classes.container}>
              {(myFriends.length !== 0) ? myFriends.map((bartender) => {
                return (
                  <div key={bartender.friendUserId}>
                    <form>
                      <input required type='radio' id='user' value={bartender.friendUserId} />
                      <label htmlFor='user'><img src={bartender.friendUserImageId} alt='' /> {bartender.friendUserName}</label>
                    </form>
                    <button className='btn' onClick={() => shareHandler(bartender.friendUserId)}>Confirm</button>
                    <button className='btn' onClick={closeShareModalHandler}>Cancel</button>
                  </div>
              )}) : (
                <div>
                  <h6>No Friends to Share At This Moment.</h6>
                  <button className='btn' onClick={closeShareModalHandler}>Close</button>
                </div>
              )}
            </div>
          </div>
        )}
        {showShareModal && <Backdrop onCancel={closeShareModalHandler} />}
      </div>
      <hr />
      <button className={classes.user} onClick={navigateUserHandler}>{props.bartender}</button>
      <img className={classes.pic} src={props.image} alt='drink pic' />
      <h4>Ingredients</h4>
      <h5>{props.making}</h5>
      <h4>Steps</h4>
      <h5>{props.description}</h5>
    </div>
  );
};

export default MarkedRecipe;