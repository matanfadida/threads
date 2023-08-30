import { useContext, useEffect, useState } from "react";
import Post from "../Post/Post";

import classes from "./Home.module.css";
import Context from "../context/context";

const Home = (props) => {
  const ctx = useContext(Context);
  const [postApi, setPostApi] = useState([]);
  const setError = ctx.setError;
  const token = ctx.token;

  useEffect(() => {
    const getPots = async () => {
      try{
        ctx.setLoadingHandler(true);
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
        ctx.setLoadingHandler(false);
      }catch (error) {
        ctx.setErrorHandler(error);
        ctx.setLoadingHandler(false);
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
        image={'http://localhost:5000/'+ post.user.image}
        user={post.user}
        text={post.content}
        comments={post.comments}
        likes={post.likes}
        ChangePageHandler={() => ctx.ChangePageHandler}
      />
    );
  });

  return (
    <>
      <div>
        <ul className={classes["home-ul"]}>{posts}</ul>
      </div>
    </>
  );
};

export default Home;
