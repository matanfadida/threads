import classes from "./post.module.css"; 
import { AiOutlineHeart } from 'react-icons/ai';
// import { FaRegComment } from 'react-icons/fa';
import { TbMessageCircle2, TbShare3 } from 'react-icons/tb';


const Post = (props) => {
    return <li className={classes.post}>
        <div>
            <img className={classes['post-img']} src={props.image} alt={props.name}/>
        </div>
        <div className={classes['side-two']}>
            <strong>{props.name}</strong>
            <p className={classes.details}>{props.text}</p>
            <ul>
                <li>
                    <a href="#1"><AiOutlineHeart size={25}/></a>
                </li>
                <li>
                    <a href="#2"><TbMessageCircle2 size={25}/></a>
                </li>
                <li>
                    <a href="#4"><TbShare3 size={25}/></a>
                </li>
            </ul>
        </div>
        <div>
            <ul className={classes['ul-comlik']}>
                <li>
                    comment
                </li>
                <li>
                    {props.likes} likes
                </li>
            </ul>
        </div>
        <hr/>
    </li>
}

export default Post;