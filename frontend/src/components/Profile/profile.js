import { useParams } from 'react-router-dom';


const Profile = (props) => {
  const { Id } = useParams();
  console.log('id',Id);
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
