import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import editBtn from '../../../../components/images/components/edit.png';
import shareBtn from '../../../../components/images/components/share.png';
import deleteBtn from '../../../../components/images/components/delete.png';
import Modal from '../../../../components/UI/Modal/Modal';
import Backdrop from '../../../../components/UI/Backdrop/Backdrop';
import { deleteRecipe } from '../../../../components/lib/api';
import classes from './MarkedRecipe.module.css';

const MarkedRecipe = (props) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const showModalHandler = () => {
    setShowModal(true);
  };
  
  const closeModalHandler = () => {
    setShowModal(false);
  };

  const navigateHandler = () => {
    navigate(`/recipes/${props.recipeId}/edit-your-twist`);
  };

  const deleteHandler = () => {
    deleteRecipe(props.recipeId);
    navigate('/recipes');
  };

  return (
    <div className={classes.recipe}>
      <div className={classes.btn}>
        <h2>{props.drinkName}</h2>
        {props.showBtn ? (
          <div>
            <button><img src={editBtn} alt='edit' onClick={navigateHandler} /></button>
            <button><img src={deleteBtn} alt='delete' onClick={showModalHandler} /></button>
            <div className={classes.actions}>
              {showModal && <Modal text='Do you want to permanently delete this DRINK-CIPE?' onConfirm={deleteHandler} onCancel={closeModalHandler} />}
              {showModal && <Backdrop onCancel={closeModalHandler} />}
            </div>
          </div>
        ) : null}
        <img src={shareBtn} alt='share' />
      </div>
      <hr />
      <h3>{props.bartender}</h3>
      <img className={classes.pic} src={props.image} alt='drink pic' />
      <h4>Ingredients</h4>
      <h5>{props.making}</h5>
      <h4>Steps</h4>
      <h5>{props.description}</h5>
    </div>
  );
};

export default MarkedRecipe;