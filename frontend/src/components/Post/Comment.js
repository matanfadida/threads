import { PiPaperclipThin } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import classes from "./addPost.module.css";
import { Fragment, useRef, useState } from "react";

const Comment = ({ isPost, user, post, AddCommentHandler }) => {
    const [styleInput, setStyleInput] = useState(true);
    const [showX, setshowX] = useState(false);
    const contentInputRef = useRef();

    const changeInput = (e) => {
        setStyleInput(false);
        if (+e.target.value.length === 0) {
            console.log('b')
            setshowX(false);
            AddCommentHandler();
        } else {
            setshowX(true);
        }
        contentInputRef.current.style.height = "inherit";
        contentInputRef.current.style.height = `${contentInputRef.current.scrollHeight}px`;
    };

    const clearInput = () => {
        if (contentInputRef.current) {
            contentInputRef.current.value = "";
        }
        setStyleInput(true);
        setshowX(false);
    };

    return <div>
        <div>
            <NavLink to={`profile/${user._id}`}>
                <img
                    className={classes["post-img"]}
                    src={"http://localhost:5000/" + user.image}
                    alt={user.name}
                />
            </NavLink>
        </div>
        <div className={classes["side-two"]}>
            <div>
                <ul>
                    <li className={classes["li-userName"]}>
                        <NavLink
                            className={classes.userName}
                            to={`/profile/${user._id}`}
                        >
                            <strong className={classes.name}>{user.userName}</strong>
                        </NavLink>
                        <span
                            onClick={clearInput}
                            className={showX ? "" : "display_none"}
                        >
                            x
                        </span>
                    </li>
                    {isPost ? <li>
                        {post.content}
                    </li> : <Fragment>
                        <li>
                            <textarea
                                onChange={changeInput}
                                ref={contentInputRef}
                                className={styleInput ? classes.input : classes["input-text"]}
                                placeholder={`Answer to ${post.user.userName}`}
                            />
                        </li>
                        <li className={classes.icon}>
                            <PiPaperclipThin size={30} />
                        </li>
                    </Fragment>}
                </ul>
            </div>
        </div>
    </div>
}

export default Comment;