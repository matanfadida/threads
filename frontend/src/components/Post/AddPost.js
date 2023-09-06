import { useContext, useEffect, useState } from "react";
import Context from "../context/context";
import classes from "./addPost.module.css";
import { HiOutlinePaperClip } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const AddPost = () => {
  const ctx = useContext(Context);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        ctx.setLoadingHandler(true);
        const response = await fetch(
          `http://localhost:5000/api/user/get-user`,
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
        ctx.setLoadingHandler(false);
      } catch (error) {
        ctx.setErrorHandler(error);
        ctx.setLoadingHandler(false);
        console.log("error message: ", error.message);
      }
    };
    getUser();
  }, []);

  const AddPostHandler = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/post/add-post", {
        method: "post",
        body: JSON.stringify({
          content: "asdasdasdasd",
          imageUrl: "asdasdas",
        }),
        headers: {
          "Content-Type": "application/json",
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
  
  return (
    <div className={classes["popup-main"]}>
        <div>
            <button>Cancel</button>
            <h4>New thread</h4>
            <h4></h4>
        </div>
      <div>
        <NavLink to={`profile/${user._id}`}>
          <img
            className={classes["post-img"]}
            src={'http://localhost:5000/' + user.image}
            alt={user.name}
          />
        </NavLink>
      </div>
      <div className={classes["side-two"]}>
        <div>
          <ul>
            <li>
              <NavLink
                className={classes.userName}
                to={`/profile/${user._id}`}
              >
                <strong className={classes.name}>{user.userName}</strong>
              </NavLink>
            </li>
            <li>
              <HiOutlinePaperClip size={10} />
            </li>
          </ul>
        </div>
      </div>
      <div>
        <span>share to</span>
        <button onClick={AddPostHandler}>post</button>
      </div>
    </div>
  );
};

export default AddPost;
