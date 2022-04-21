import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../../components/UI/Card/Card';
import LoadingSpinner from '../../../../components/UI/LoadingSpinner/LoadingSpinner';
import Modal from '../../../../components/UI/Modal/Modal';
import Backdrop from '../../../../components/UI/Backdrop/Backdrop';
import { addItemsToForm, addRecipe } from '../../../../components/lib/api';
import ToggleSwitch from '../../../../components/UI/Toggle/ToggleSwitch';
import classes from './AddYourTwist.module.css';

const AddYourTwist = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [publicPost, setPublicPost] = useState(false);
  const [drinkNameInput, setDrinkNameInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [fieldInput, setFieldInput] = useState([{ ingredient: '', volume : '', unit: '' }]);

  const navigate = useNavigate();


  const showModalHandler = ()=> {
    setShowModal(true);
  };
  
  const closeModalHandler = () => {
    setShowModal(false);
  };

  const switchPublicPostHandler = () => {
    setPublicPost((prevState) => !prevState);
  };

  const updateDrinkNameHandler = (event) => {
    event.preventDefault();
    setDrinkNameInput(event.target.value);
  };

  const updateDescriptionHandler = (event) => {
    event.preventDefault();
    setDescriptionInput(event.target.value);
  };

  const updateFieldHandler = (i, event) => {
    event.preventDefault();

    const newFieldInput = [...fieldInput];
    newFieldInput[i][event.target.name] = event.target.value;
    setFieldInput(newFieldInput);
  };

  const addFieldHandler = () => {
      setFieldInput([...fieldInput, { ingredient: '', volume: '', unit: '' }])
  };

  const removeFieldHander = (i) => {
      const newFieldInput = [...fieldInput]; 
      newFieldInput.splice(i, 1);
      setFieldInput(newFieldInput);
  };

  const checkFormHandler = (event) => {
    event.preventDefault();

    const checkIngredientField = fieldInput.map(e => (e.ingredient));
    const checkVolumeField = fieldInput.map(e => (e.volume));
    const checkUnitField = fieldInput.map(e => (e.unit));

    if (
      drinkNameInput === '' || 
      checkIngredientField.includes('') || 
      checkVolumeField.includes('') || 
      checkUnitField.includes('') ||
      descriptionInput.length === 0
    ) {
      alert('Please fill out whole form!');
      return;
    } else {
      showModalHandler();
    };
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    
    addRecipe({
      recipe: {
        name: drinkNameInput,
        description: descriptionInput,
        public: publicPost
      }
    }).then((res) => {
      addItemsToForm((res.id), fieldInput);
      navigate('/my-recipes');
    });
  };

  return (
    <div>
      <h1 className={classes.header}>What's my DRINK-CIPE?</h1>
      <Card>
        <form className={classes.form} onSubmit={submitFormHandler}>
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}
          <ToggleSwitch label='public' onChange={switchPublicPostHandler} />
          <div className={classes.control}>
            <label htmlFor='drinkName'>Drink Name</label>
            <input type='text' id='drinkName' onChange={updateDrinkNameHandler} />
          </div>
          <div>
            {fieldInput.map((element, index) => (
              <div className={classes.control} key={index}>
                <label htmlFor='ingredient'>Ingredient</label>
                <input 
                  type='text' 
                  name='ingredient' 
                  placeholder='Gin, OJ...'
                  value={element.ingredient || ''} 
                  onChange={e => updateFieldHandler(index, e)} 
                />
                <label htmlFor='volume'>Volume</label>
                <input 
                  type='number' 
                  name='volume'
                  placeholder='number'
                  value={element.volume || ''} 
                  min='0.01'
                  step='0.01'
                  onChange={e => updateFieldHandler(index, e)} 
                />
                <label htmlFor='unit'>Unit</label>
                <input 
                  type='text' 
                  name='unit'
                  placeholder='ml, oz...'
                  value={element.unit || ''} 
                  onChange={e => updateFieldHandler(index, e)} 
                />
                {index ? (
                  <button type='button' onClick={() => removeFieldHander(index)}>
                    <strong>x</strong>
                  </button>) : null}
              </div>
            ))}
            <div>
              <button className='btn' type='button' onClick={addFieldHandler}>More Fields</button>
            </div>
          </div>
          <div className={classes.control}>
            <label htmlFor='drinkName'>Description</label>
          </div>
          <div className={classes.control}>
            <textarea 
              name='description'
              value={descriptionInput}
              placeholder='Steps for this DRINK-CIPE!'
              onChange={updateDescriptionHandler}
            />
          </div>
          <div className={classes.actions}>
            <button className='btn' onClick={checkFormHandler}>Add Recipe</button>
            {showModal && <Modal text='Are you ready to submit?' onConfirm={submitFormHandler} onCancel={closeModalHandler} />}
            {showModal && <Backdrop onCancel={closeModalHandler} />}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddYourTwist;
