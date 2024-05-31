import { useContext, useEffect, useRef, useState } from "react";
import Context from "../context/context";
import classes from "./addPost.module.css";
import Popup from "../UI/Popup";
import ButtonPost from "../UI/buttonPost";
import Comment from "./Comment";

const AddComment = (props) => {
    const ctx = useContext(Context);
    const [user, setUser] = useState({});
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState({});
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
                setComments([{isPost:false, post:result, user:user}]);
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
        // const enterdContent = contentInputRef.current.value;
        const enterdSelectOption = selectOption.current.value;
        // const enterdImage = imageInputRef.current.files[0];
        // formData.append("content", enterdContent);
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



    const Close = () => {
        props.showAddCommentHandler();
    }

    if (post.user === undefined) {
        console.log('post', post)
        return;
    }

    const AddCommentHandler = () => {
        console.log('a')
        const newComment = { isPost: false, post: post, user: user };
        setComments(prevComments => [...prevComments, newComment]);
    }

    return (
        <Popup onClick={Close} show={props.show} title={"Answer"}>
            <div className={classes["post-main"]}>
                <Comment isPost={true} post={post} user={post.user} AddCommentHandler={AddCommentHandler}/>
                {comments.map((comment,i) => 
                    <Comment key={i} isPost={comment.isPost} post={comment.post} user={comment.user} />
                )}
                <div className={classes["send-post"]}>
                    <select className={classes.select} ref={selectOption}>
                        <option value="1">Anyone can reply</option>
                        <option value="2">Profile you follow</option>
                        <option value="3">Mentioned only</option>
                    </select>
                    {/* <ButtonPost onClick={AddPostHandler} className={startWrite ? "active" : ""}>Post</ButtonPost> */}
                </div>
            </div>
        </Popup>
    );
};

export default AddComment;
