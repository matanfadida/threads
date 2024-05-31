import classes from "./button.module.css"

const Button = (props) => {
    const onClickHandler = () => {
        props.onClick();
    }
    return <button onClick={onClickHandler} className={classes.button}>{props.children}</button>
}

export default Button;