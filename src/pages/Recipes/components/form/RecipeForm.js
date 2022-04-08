import { useState } from 'react';
import Card from '../../../../components/UI/Card/Card';
import LoadingSpinner from '../../../../components/UI/LoadingSpinner/LoadingSpinner';
import Modal from '../../../../components/UI/Modal/Modal';
import Backdrop from '../../../../components/UI/Backdrop/Backdrop';
import classes from './RecipeForm.module.css';

const RecipeForm = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [drinkNameInput, setDrinkNameInput] = useState('');
  const [bartenderInput, setBartenderInput] = useState('');
  const [fieldInput, setFieldInput] = useState([{ ingredient: '', volume : '' }]);

  const showModalHandler = ()=> {
    setShowModal(true);
  };
  
  const closeModalHandler = () => {
    setShowModal(false);
  };

  const updateDrinkNameHandler = (event) => {
    event.preventDefault();
    setDrinkNameInput(event.target.value);
  };

  const updateBartenderHandler = (event) => {
    event.preventDefault();
    setBartenderInput(event.target.value);
  };

  const updateFieldHandler = (i, event) => {
    event.preventDefault();
    const newFieldInput = [...fieldInput];
    newFieldInput[i][event.target.name] = event.target.value;
    setFieldInput(newFieldInput);
  };

  const addFieldHandler = () => {
    setFieldInput([...fieldInput, { ingredient: '', volume: '' }])
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

    if (
      drinkNameInput === '' || 
      bartenderInput === '' || 
      checkIngredientField.includes('') || 
      checkVolumeField.includes('')
    ) {
      alert('Please fill out whole form!');
      return;
    } else {
      showModalHandler();
    };
  };

  const submitFormHandler = (event) => {
    event.preventDefault();

    props.onAddRecipe({ drinkName: drinkNameInput, bartender: bartenderInput, making: fieldInput });

    setDrinkNameInput('');
    setBartenderInput('');
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={submitFormHandler}>
        {props.isLoading && (
          <div className={classes.loading}>
            <LoadingSpinner />
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor='drinkName'>Drink Name</label>
          <input type='text' id='drinkName' onChange={updateDrinkNameHandler} />
        </div>
        <div className={classes.control}>
          <label htmlFor='bartender'>Bartender</label>
          <input type='text' id='bartender' onChange={updateBartenderHandler} />
        </div>
        <div>
          {fieldInput.map((element, index) => (
            <div className={classes.control} key={index}>
              <label>Ingredient</label>
              <input 
                type='text' 
                name='ingredient' 
                placeholder='ex: Gin, syrup'
                value={element.ingredient || ""} 
                onChange={e => updateFieldHandler(index, e)} 
              />
              <label>Volume</label>
              <input 
                type='text' 
                name='volume'
                placeholder='ex: ml, ounce'
                value={element.volume || ""} 
                onChange={e => updateFieldHandler(index, e)} 
              />
              {index ? <button type='button' onClick={() => removeFieldHander(index)}>Remove</button> : null}
            </div>
          ))}
          <div>
            <button className='btn' type='button' onClick={addFieldHandler}>More Fields</button>
          </div>
        </div>
        <div className={classes.actions}>
          <button className='btn' onClick={checkFormHandler}>Add Recipe</button>
          {showModal && <Modal onConfirm={submitFormHandler} onCancel={closeModalHandler} />}
          {showModal && <Backdrop onCancel={closeModalHandler} />}
        </div>
      </form>
    </Card>
  );
};

export default RecipeForm;
