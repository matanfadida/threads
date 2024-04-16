import { useEffect, useContext } from 'react';
import Context from "../context/context";
import { useParams } from 'react-router-dom';


const Profile = (props) => {
  const { Id } = useParams();
  const ctx = useContext(Context);

  const setError = ctx.setError;
  const token = ctx.token;
  console.log('id',Id);
  useEffect(() => {
    const getPots = async () => {
      try{
        ctx.setLoadingHandler(true);
          const response = await fetch(`http://localhost:5000/api/post/get-posts`,{
            method:'post',
            body: JSON.stringify({
              userId: Id,
          }),
          headers: { Authorization: 'Bearer ' +  token}
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw error;
        }

        const result = await response.json();
        console.log(result);
        // setPostApi(result);
        ctx.setLoadingHandler(false);
      }catch (error) {
        ctx.setErrorHandler(error);
        ctx.setLoadingHandler(false);
        console.log('error message: ',error.message);
      }
    };
      getPots();
  }, []);
  return (
    <div>
        <div>
            hader
        </div>
      <div>
        <div>
          <h3>matan</h3>
          <span>image profile</span>
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
