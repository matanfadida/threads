import { useEffect, useContext, useState } from 'react';
import Context from "../context/context";
import { useParams } from 'react-router-dom';
import classes from './profile.module.css';
import Loader from "../Loader/loader";
import Post from "../Post/Post";

const Profile = (props) => {
  const { Id } = useParams();
  const [user, setUser] = useState({});
  const [postApi, setPostApi] = useState([]);
  const [repliesApi, setRepliesApi] = useState([]);
  const [threadsActive, setThreadsActive] = useState(true);
  const [repliesActive, setRepliesActive] = useState(false);
  const ctx = useContext(Context);

  const setError = ctx.setError;
  const token = ctx.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        ctx.setLoadingHandler(true);
        console.log('ad');

        const userResponse = await fetch(
          `http://localhost:5000/api/user/get-user?userId=${Id}&query=-Activity -comments -email -password`,
          {
            headers: { Authorization: "Bearer " + token, 'Content-Type': 'application/json' },
          }
        );

        if (!userResponse.ok) {
          const error = await userResponse.json();
          throw error;
        }

        const userData = await userResponse.json();
        console.log(userData.data);
        setUser(userData.data);

        const postsResponse = await fetch(`http://localhost:5000/api/post/get-posts?userId=${Id}`, {
          headers: { Authorization: 'Bearer ' + token }
        });

        if (!postsResponse.ok) {
          const error = await postsResponse.json();
          throw error;
        }

        const postsData = await postsResponse.json();
        setPostApi(postsData);

        ctx.setLoadingHandler(false);
      } catch (error) {
        ctx.setErrorHandler(error);
        ctx.setLoadingHandler(false);
        console.log("error message: ", error.message);
      }
    };

    fetchData();
  }, [Id]);

  const setThreadsActiveHandler = () => {
    setRepliesActive(false);
    setThreadsActive(true);
  }

  const setRepliesActiveHandler = () => {
    setThreadsActive(false);
    setRepliesActive(true);
  }

  const GetMore = async () => {
    try {
      ctx.setLoadingHandler(true);
      const postsResponse = await fetch(`http://localhost:5000/api/post/get-posts`, {
        headers: { Authorization: 'Bearer ' + token }
      });

      if (!postsResponse.ok) {
        const error = await postsResponse.json();
        throw error;
      }

      const postsData = await postsResponse.json();
      setPostApi(postsData);

      ctx.setLoadingHandler(false);
    } catch (error) {
      ctx.setErrorHandler(error);
      ctx.setLoadingHandler(false);
      console.log("error message: ", error.message);
    }
  }

  if (Object.keys(user).length === 0) {
    return <Loader />
  }

  const posts = postApi.map((post) => {
    return (
      <Post
        key={post._id}
        _id={post._id}
        image={'http://localhost:5000/' + post.user.image}
        user={post.user}
        text={post.content}
        comments={post.comments}
        likes={post.likes}
        ChangePageHandler={() => ctx.ChangePageHandler}
      />
    );
  });

  return (
    <div>
      <div className={classes['header']}>
        hader
      </div>
      <div className={classes['div']}>
        <div className={`${classes['display_flex_space']} ${classes['margin_button_8']}`}>
          <div>
            <h3 className={classes['margin_button_8']}>{user.firstName} {user.lastName}</h3>
            <span>{user.userName}</span>
          </div>
          <div>
            <span><img className={classes['post-img']} src={'http://localhost:5000/' + user.image} alt={user.name} /></span>
          </div>
        </div>
        <p className={classes['margin_button_8']}>some text</p>
        <div className={classes['margin_button_15']}>
          <span>image</span>
          <span>{user.followers.length} following</span>
        </div>
        <div className={classes['display_flex_space']}>
          <button className={classes['buttons']}>Edit profile</button>
          <button className={`${classes['buttons']} ${classes['margin_left_10']}`}>Share profile</button>
        </div>
      </div>
      <div>
        <div className={classes['div-threads']}>
          <button onClick={setThreadsActiveHandler} className={`${classes['threads-button']} ${threadsActive ? classes['active'] : classes['border-bottom']}`}>Threads</button>
          <button onClick={setRepliesActiveHandler} className={`${classes['threads-button']} ${repliesActive ? classes['active'] : classes['border-bottom']}`}>Replies</button>
        </div>
        <div>
          {ctx.isLoading && <Loader />}
          {threadsActive && <ul className={classes["home-ul"]}>{posts}</ul>}
          {repliesActive && <ul className={classes["home-ul"]}>{repliesApi}</ul>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
