import classes from "./error-popup.module.css";

const ErrorPopup = (props) => {
    const ErrorConfimHandler = () => {
        if(props.error.status === "Authorization Error"){
            props.ChangePageHandler("signin");
            props.setError(undefined);
        }
    }

    return (
        <div className={classes.background}>
        <div className={classes.popup}>
            <h3 className={classes.title}>{props.error.status}</h3>
            <hr />
            <div className={classes.message}>{props.error.message}</div>
            <hr />
            <div className={classes.footer}>
            <button className={classes["button-ok"]} onClick={ErrorConfimHandler}>ok</button>
            </div>
        </div>
        </div>
    );
};

export default ErrorPopup;
