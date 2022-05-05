import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../../../../components/UI/Card/Card';
import Modal from '../../../../../components/UI/Modal/Modal';
import Backdrop from '../../../../../components/UI/Backdrop/Backdrop';
import ToggleSwitch from '../../../../../components/UI/Toggle/ToggleSwitch';
import { getSingleRecipe, getItemsOfRecipe, editRecipe, editItemsInForm, addItemsToForm, deleteItemFromForm } from '../../../../../components/lib/api';
import UploadRecipePic from '../../../../../components/upload/UploadRecipePic';
import classes from '../create/AddYourTwist.module.css';

const EditYourTwist = () => {
    //old value
    const [oldDrinkName, setOldDrinkName] = useState('');
    const [oldDescription, setOldDescription] = useState('');
    const [making, setMaking] = useState([]);

    //new value
    const [showModal, setShowModal] = useState(false);
    const [publicPost, setPublicPost] = useState(false);
    const [drinkNameInput, setDrinkNameInput] = useState(oldDrinkName);
    const [descriptionInput, setDescriptionInput] = useState(oldDescription);
    const [fieldInput, setFieldInput] = useState([{ ingredient: '', volume : '', unit: '' }]);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getSingleRecipe(params.recipeId).then(res => {
            setOldDrinkName(res.name);
            setOldDescription(res.description);
        });
        getItemsOfRecipe(params.recipeId).then(res => {
            setMaking(res);
        });
    }, [params]);

    const showModalHandler = () => {
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

    const editOldFieldHandler = (i, event) => {
        event.preventDefault();
        
        making[i][event.target.name] = event.target.value;
        setMaking(making);
    };

    const removeOldFieldHander = (id) => {
        deleteItemFromForm(params.recipeId, {
            id: id
        });

        setMaking(making.filter((field) => {
            return field.id !== id;
        }));
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
        checkIngredientField.includes('') || 
        checkVolumeField.includes('') || 
        checkUnitField.includes('') 
        ) {
        alert('Please fill out whole form!');
        return;
        } else {
        showModalHandler();
        };
    };

    const submitFormHandler = (event) => {
        event.preventDefault();

        if (drinkNameInput === '' && descriptionInput === '') {
            editRecipe({
                recipe: {
                    id: params.recipeId,
                    name: oldDrinkName,
                    description: oldDescription,
                    public: publicPost
                }
            })
        } else if (drinkNameInput === '') {
            editRecipe({
                recipe: {
                    id: params.recipeId,
                    name: oldDrinkName,
                    description: descriptionInput,
                    public: publicPost
                }
            })
        } else if (descriptionInput === '') {
            editRecipe({
                recipe: {
                    id: params.recipeId,
                    name: drinkNameInput,
                    description: oldDescription,
                    public: publicPost
                }
            })
        } else {
            editRecipe({
                recipe: {
                    id: params.recipeId,
                    name: drinkNameInput,
                    description: descriptionInput,
                    public: publicPost
                }
            })
        };
        
        editItemsInForm(params.recipeId, making);
        
        if (fieldInput.length > 0) {
            addItemsToForm(params.recipeId, fieldInput);
        };

        navigate('/my-recipes');
    };

    return (
        <div>
            <h1 className={classes.header}>What's my DRINK-CIPE?</h1>
            <Card>
                <form className={classes.form} onSubmit={submitFormHandler}>
                    <ToggleSwitch label='public' onChange={switchPublicPostHandler} />
                    <div className={classes.control}>
                        <label htmlFor='drinkName'>Drink Name</label>
                        <input type='text' id='drinkName' value={drinkNameInput || oldDrinkName} onChange={updateDrinkNameHandler} />
                    </div>
                    <UploadRecipePic />
                    <div>
                        {making.map((element, index) => (
                            <div className={classes.control} key={element.id}>
                                <label htmlFor='ingredient'>Ingredient</label>
                                <input 
                                type='text' 
                                name='ingredient' 
                                defaultValue={element.ingredient}
                                onChange={e => editOldFieldHandler(index, e)} 
                                />
                                <label htmlFor='volume'>Volume</label>
                                <input 
                                type='number' 
                                name='volume'
                                defaultValue={element.volume}
                                min='0.01'
                                step='0.01'
                                onChange={e => editOldFieldHandler(index, e)} 
                                />
                                <label htmlFor='unit'>Unit</label>
                                <input 
                                type='text' 
                                name='unit'
                                defaultValue={element.unit} 
                                onChange={e => editOldFieldHandler(index, e)} 
                                />
                                {index ? (
                                <button type='button' onClick={() => removeOldFieldHander(element.id)}>
                                    <strong>x</strong>
                                </button>) : null}
                            </div>
                        ))}
                        {fieldInput.map((element, index) => (
                            <div className={classes.control} key={index}>
                                <label htmlFor='ingredient'>Ingredient</label>
                                <input 
                                type='text' 
                                name='ingredient' 
                                value={element.ingredient || ''} 
                                onChange={e => updateFieldHandler(index, e)} 
                                />
                                <label htmlFor='volume'>Volume</label>
                                <input 
                                type='number' 
                                name='volume'
                                value={element.volume || ''} 
                                min='0.01'
                                step='0.01'
                                onChange={e => updateFieldHandler(index, e)} 
                                />
                                <label htmlFor='unit'>Unit</label>
                                <input 
                                type='text' 
                                name='unit'
                                value={element.unit || ''} 
                                onChange={e => updateFieldHandler(index, e)} 
                                />
                                <button type='button' onClick={() => removeFieldHander(index)}>
                                    <strong>x</strong>
                                </button>
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
                        value={descriptionInput || oldDescription}
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

export default EditYourTwist;