import { useEffect, useContext } from 'react';
import Context from "../context/context";
import { useParams } from 'react-router-dom';


const Profile = (props) => {
  const { Id } = useParams();
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
      <div>
        hader
      </div>
      <div>
        <div>
          <h3>Matan Fadida</h3>
          <span>image profile</span>
          <span>username</span>
        </div>
        <p>some text</p>
        <div>
          <span>image</span>
          <span>50 following</span>
        </div>
        <div>
          <button>edit</button>
          <button>share</button>
        </div>
      </div>
      <div>

      </div>
    </div>
  );
};

export default Profile;
