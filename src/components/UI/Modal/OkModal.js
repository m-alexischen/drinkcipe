import classes from './Modal.module.css';

const Modal = (props) => {
    return (
        <div className={classes.modal}>
            <p>{props.text}</p>
            <button className='btn' onClick={props.onCancel}>{props.btnText}</button>
        </div>
    );
};

export default Modal;