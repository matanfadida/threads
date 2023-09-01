import { useContext, useEffect, useState } from "react";
import classes from "./post.module.css"; 
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { TbMessageCircle2, TbShare3 } from 'react-icons/tb';
import { NavLink } from "react-router-dom";
import Context from "../context/context";


const Post = (props) => {
    const ctx = useContext(Context);
    const [liked, setLiked] = useState(false);
    const [countLikes, setCountLikes] = useState(props.likes.count);

    useEffect(() => {
        var userLike = props.likes.userId.find(x => x === localStorage.getItem("userId"));
        if(userLike){
            setLiked(true);
        }
    },[])

    const UpdateLikeHandler = async(like) => {
        try{
            const response = await fetch("http://localhost:5000/api/post/update-like", {
                method: "post",
                body: JSON.stringify({
                    like: like,
                    postId: props._id,
                    userId: localStorage.getItem("userId"),
                }),
                headers: { 'Content-Type': 'application/json',Authorization: 'Bearer ' +  ctx.token}
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
            console.log('error message: ',error.message);
          }
        
    }

    return <li className={classes.post}>
        <div>
            <NavLink to={`profile/${props._id}`}><img  className={classes['post-img']} src={props.image} alt={props.name}/></NavLink>
        </div>
        <div className={classes['side-two']}>
            <strong>{props.user.userName}</strong>
            <p className={classes.details}>{props.text}sadasdasdasdasdasdadaedfweferfreferferfwedqdqw</p>
            <ul>
                <li>
                    {liked ? <a onClick={() => UpdateLikeHandler(-1)}><AiFillHeart size={25}/></a> : <a onClick={() => UpdateLikeHandler(1)}><AiOutlineHeart size={25}/></a> }
                </li>
                <li>
                    <a href="#2"><TbMessageCircle2 size={25}/></a>
                </li>
                <li>
                    <a href="#4"><TbShare3 size={25}/></a>
                </li>
            </ul>
            <div>
            <ul className={classes['ul-comlik']}>
                <li>
                    comment
                </li>
                <li>
                    {countLikes} likes
                </li>
            </ul>
        </div>
        </div>
        <hr/>
    </li>
}

export default Post;