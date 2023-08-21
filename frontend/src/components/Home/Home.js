import { useEffect, useState } from "react";
import Post from "../Post/Post";

import classes from "./Home.module.css";

const dummyPosts = [
  {
    _id: "1",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    name: "matan",
    text: "sasdasdasdasdasd",
    comments: "comments",
    likes: 50,
  },
  {
    _id: "2",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    name: "matan2",
    text: "sasdasdasdasdasd2",
    comments: "comments2",
    likes: 52,
  },
];

const Home = (props) => {
  const [postApi, setPostApi] = useState([]);
  const setError = props.setError;
  const token = props.token;

  useEffect(() => {
    const getPots = async () => {
      try{
          const response = await fetch(`http://localhost:5000/api/post/get-posts`,{
          headers: { Authorization: 'Bearer ' +  token}
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw error;
        }

        const result = await response.json();
        console.log(result);
        setPostApi(result);
      }catch (error) {
        setError(error);
        console.log('error message: ',error.message);
      }
    };
      getPots();
  }, [token,setError]);

  const posts = postApi.map((post) => {
    return (
      <Post
        key={post._id}
        _id={post._id}
        image={'http://localhost:5000/'+ post.imageUrl}
        user={post.user}
        text={post.content}
        comments={post.comments}
        likes={post.likes}
        ChangePageHandler={props.ChangePageHandler}
      />
    );
  });
  // const posts = dummyPosts.map((post) => {
  //   return (
  //     <Post
  //       key={post._id}
  //       _id={post._id}
        
  //       ChangePageHandler={props.ChangePageHandler}
  //     />
  //   );
  // });

  return (
    <>
      <div>
        <ul className={classes["home-ul"]}>{posts}</ul>
      </div>
    </>
  );
};

export default Home;
