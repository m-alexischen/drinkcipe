import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { addRecipeImage } from '../lib/api';
import classes from './UploadRecipePic.module.css';

const UploadRecipePic = () => {
    const params = useParams();
    const token = localStorage.getItem('token');

    const [file, setFile] = useState('');

    const uploadFileHandler = (event) => {
        setFile(event.target.files[0]);
    };

    const fileSubmitHandler = (event) => {
        event.preventDefault();

        const formData = new FormData();
        
        if (file.size > 1024 * 1000 * 5){
            alert('size exceeded!');
            return;
        };

        formData.append('file', file);

        const data = { 
            method: 'POST',
            body: formData,
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token,
            },
        };

        addRecipeImage(params.recipeId, data);
    };

    return (
        <div className={classes.control}>
            <label htmlFor='file'>Drink Pic</label>
            <input type='file' id='file' onChange={uploadFileHandler} />
            <button type='submit' onClick={fileSubmitHandler}>Upload</button>
        </div>
    );
};

export default UploadRecipePic;