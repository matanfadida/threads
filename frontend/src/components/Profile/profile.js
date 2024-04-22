import { useEffect, useContext, useState } from 'react';
import Context from "../context/context";
import { useParams } from 'react-router-dom';
import classes from './profile.module.css';


const Profile = (props) => {
  const { Id } = useParams();
  const [user, setUser] = useState({});
  const ctx = useContext(Context);

  const setError = ctx.setError;
  const token = ctx.token;

  useEffect(() => {
    const getUser = async () => {
      try {
        ctx.setLoadingHandler(true);
        const response = await fetch(
          `http://localhost:5000/api/user/get-user`,
          {
            method:'post',
            body: JSON.stringify({
              userId: Id,
              query: '-Activity -comments -email -password',
            }),
            headers: { Authorization: "Bearer " + token , 'Content-Type': 'application/json'},
          }
        );

        if (!response.ok) {
          const error = await response.json();
          throw error;
        }

        const result = await response.json();
        console.log(result.data);
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
          <span><img  className={classes['post-img']} src={'http://localhost:5000/' + user.image} alt={user.name}/></span>
          </div>
        </div>
        <p className={classes['margin_button_8']}>some text</p>
        <div className={classes['margin_button_15']}>
          <span>image</span>
          <span>50 following</span>
        </div>
        <div className={classes['display_flex_space']}>
          <button className={classes['buttons']}>Edit profile</button>
          <button className={`${classes['buttons']} ${classes['margin_left_10']}`}>Share profile</button>
        </div>
      </div>
      <hr/>
      <div>

      </div>
    </div>
  );
};

export default Profile;
