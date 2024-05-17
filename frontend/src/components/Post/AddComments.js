import { useContext, useEffect, useRef, useState } from "react";
import Context from "../context/context";
import classes from "./addPost.module.css";
import { PiPaperclipThin } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import Popup from "../UI/Popup";

const AddComment = (props) => {
    const ctx = useContext(Context);
    const [user, setUser] = useState({});
    const [post, setPost] = useState({});
    const [styleInput, setStyleInput] = useState(true);
    const [showX, setshowX] = useState(false);
    const contentInputRef = useRef();
    const selectOption = useRef();

    useEffect(() => {
        const getUser = async () => {
            try {
                ctx.setLoadingHandler(true);
                const userId = localStorage.getItem("userId");
                const response = await fetch(
                    `http://localhost:5000/api/user/get-user?userId=${userId}`,
                    {
                        headers: { Authorization: "Bearer " + ctx.token },
                    }
                );

                if (!response.ok) {
                    const error = await response.json();
                    throw error;
                }

                const result = await response.json();
                setUser(result.data);
            } catch (error) {
                ctx.setErrorHandler(error);
                ctx.setLoadingHandler(false);
                console.log("error message: ", error.message);
            }
        };
        const getPost = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/post/get-post?postId=${props.postId}`,
                    {
                        headers: { Authorization: "Bearer " + ctx.token },
                    }
                );

                if (!response.ok) {
                    const error = await response.json();
                    throw error;
                }

                const result = await response.json();
                console.log(result);
                setPost(result);
                ctx.setLoadingHandler(false);
            } catch (error) {
                ctx.setErrorHandler(error);
                ctx.setLoadingHandler(false);
                console.log("error message: ", error.message);
            }
        };
        if (props.show) {
            getUser();
            getPost();
        }
    }, []);

    const AddPostHandler = async () => {
        const formData = new FormData();
        const enterdContent = contentInputRef.current.value;
        const enterdSelectOption = selectOption.current.value;
        // const enterdImage = imageInputRef.current.files[0];
        formData.append("content", enterdContent);
        formData.append("showTo", enterdSelectOption);
        // formData.append("image", enterdImage);

        try {
            const res = await fetch("http://localhost:5000/api/post/add-post", {
                method: "post",
                body: formData,
                headers: {
                    Authorization: "Bearer " + ctx.token,
                },
            });

            if (!res.ok) {
                const error = await res.json();
                throw error;
            }
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log("error message: ", error.message);
            //if user not auth return to sign in page
        }
    };

    const changeInput = (e) => {
        setStyleInput(false);
        if (+e.target.value.length === 0) {
            setshowX(false);
        } else {
            setshowX(true);
        }
    };

    const clearInput = () => {
        if (contentInputRef.current) {
            contentInputRef.current.value = "";
        }
        setStyleInput(true);
        setshowX(false);
    };

    const Close = () => {
        props.showAddCommentHandler();
    }

    if (post.user === undefined) {
        console.log('post', post)
        return;
    }

    return (
        <Popup onClick={Close} show={props.show} title={"Answer"}>
            <div>
            {post.content}
            </div>
            <div className={classes["post-main"]}>
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
                            <li>
                                <input
                                    onChange={changeInput}
                                    ref={contentInputRef}
                                    className={styleInput ? classes.input : classes["input-text"]}
                                    placeholder={`Answer to ${post.user.userName}`}
                                />
                            </li>
                            <li className={classes.icon}>
                                <PiPaperclipThin size={30} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={classes["send-post"]}>
                <select className={classes.select} ref={selectOption}>
                    <option value="1">Anyone can reply</option>
                    <option value="2">Profile you follow</option>
                    <option value="3">Mentioned only</option>
                </select>
                <button onClick={AddPostHandler} className={classes["button-post"]}>
                    Post
                </button>
            </div>
        </Popup>
    );
};

export default AddComment;