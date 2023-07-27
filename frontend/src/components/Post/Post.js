

const Post = (props) => {
    return <li>
        <img src={props.image} alt={props.name}/>
        <span>{props.name}</span>
        <p>{props.text}</p>
        <a href="#4">{props.likes}</a>
        <a href="#1">comment</a>
        <a href="#2">save post</a>
        <a href="#3">share</a>
    </li>
}

export default Post;