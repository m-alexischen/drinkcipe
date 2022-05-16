import classes from './Modal.module.css';

const Modal = (props) => {
    return (
        <div className={classes.modal}>
            <p>{props.text}</p>
            <button className='btn' onClick={props.onConfirm}>Confirm</button>
            <span />
            <button className='btn' onClick={props.onCancel}>Cancel</button>
        </div>
    );
};

export default Modal;