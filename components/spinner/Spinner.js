import classes from './globalSpinner.module.css'

const Spinner = () => {
    return (
        <div className={classes.spinnerContainer}>
            <div className={classes.loader}>Loading...</div>
        </div>
    )
}

export default Spinner
