import classes from './ToggleSwitch.module.css';

const ToggleSwitch = ({ label, onChange }) => {

    return (
        <div className={classes.container}>
            {label}{' '}
            <div className={classes.toggle}>
                <input 
                    type='checkbox' 
                    className={classes.checkbox}
                    name={label} 
                    id={label} 
                    onChange={onChange}
                />
                <label className={classes.label} htmlFor={label}>
                    <span className={classes.inner} />
                    <span className={classes.switch} />
                </label>
            </div>
        </div>
    );
};

export default ToggleSwitch;
