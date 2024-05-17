import { useContext, useEffect, useState } from "react";
import classes from "./post.module.css";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { TbMessageCircle2, TbShare3 } from 'react-icons/tb';
import { NavLink } from "react-router-dom";
import Context from "../context/context";
import AddComment from "./AddComments";


const Post = (props) => {
    const ctx = useContext(Context);
    const [liked, setLiked] = useState(false);
    const [showAddComment, setShowAddComment] = useState(false);
    const [countLikes, setCountLikes] = useState(props.likes.count);

    useEffect(() => {
        var userLike = props.likes.userId.find(x => x === localStorage.getItem("userId"));
        if (userLike) {
            setLiked(true);
        }
    }, [])

    const UpdateLikeHandler = async (like) => {
        try {
            const response = await fetch("http://localhost:5000/api/post/update-like", {
                method: "post",
                body: JSON.stringify({
                    like: like,
                    postId: props._id,
                    userId: localStorage.getItem("userId"),
                }),
                headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + ctx.token }
            });
            if (!response.ok) {
                const error = await response.json();
                throw error;
            }

            const result = await response.json();
            if (liked) {
                setCountLikes((prevCountLikes) => prevCountLikes - 1);
            } else {
                setCountLikes((prevCountLikes) => prevCountLikes + 1);
            }
            setLiked(!liked);

        } catch (error) {
            ctx.setErrorHandler(error);
            // ctx.setLoadingHandler(false);
            console.log('error message: ', error.message);
        }

    }

    const showAddCommentHandler = () => {
        setShowAddComment(!showAddComment);
    }
    
    return <li>
        { showAddComment && <AddComment postId={props._id} show={showAddComment} showAddCommentHandler={showAddCommentHandler}/> }
        <div className={classes.post}>
            <div>
                <NavLink to={`profile/${props.user._id}`}><img className={classes['post-img']} src={props.image} alt={props.name} /></NavLink>
            </div>
            <div className={classes['side-two']}>
                <strong>{props.user.userName}</strong>
                <p className={classes.details}>{props.text}</p>
                <ul>
                    <li>
                        <div className={classes['div-icons']}>
                            <span>
                                {liked ? <a onClick={() => UpdateLikeHandler(-1)}><AiFillHeart size={20} color="#ff3040"/></a> : <a onClick={() => UpdateLikeHandler(1)}><AiOutlineHeart size={20} /></a>}
                            </span>
                            <span className={liked ? classes['like-Active'] : ""}>
                                {countLikes}
                            </span>
                        </div>
                    </li>
                    <li>
                        <div className={classes['div-icons']}>
                            <span onClick={showAddCommentHandler}>
                                <TbMessageCircle2 size={20} />
                            </span>
                            <span>
                                0
                            </span>
                        </div>
                    </li>
                    <li>
                        <div className={classes['div-icons']}>
                            <span>
                                <a href="#4"><TbShare3 size={20} /></a>
                            </span>
                            <span>
                                0
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <hr className={classes.hr} />
    </li>
}

export default Post;