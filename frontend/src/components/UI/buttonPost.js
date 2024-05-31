import classes from "./button.module.css"

const ButtonPost = (props) => {
    console.log(props);
    const onClickHandler = () => {
        props.onClick();
    }
    return <button onClick={onClickHandler} className={`${classes['button-post']} ${classes[props.className]}`}>{props.children}</button>
}

export default ButtonPost;