import {React, Fragment, useState} from "react";
import Home from './Home/Home';
import Footer from "./Footer/footer";
import Profile from "./Profile/profile";
import SignUp from "./Account/sign-up";
import SignIn from "./Account/sign-in";
import AddPost from "./Post/AddPost";
import ErrorPopup from "./error/error-popup";


const initUrlState = {
  'home': false,
  'search': false,
  'profile': false,
  'addpost': false,
  'active': false,
  'signup': false,
  'signin': true,
};
const USERIDDEFAULD = "1";
const App = () => {
  const [activePage, setActivePage] = useState(initUrlState);
  const [error, setError] = useState(undefined);
  const [token, setToken] = useState("");
  const [profileId, setProfileId] = useState('USERIDDEFAULD');
  const ChangePageHandler = (page, id=USERIDDEFAULD) => {
    const newUrlState = {
      'home': false,
      'search': false,
      'profile': false,
      'addpost': false,
      'active': false,
      'signup': false,
      'signin': false,
    };
    // const token = localStorage.getItem('token');
    // if(!token){
    //   newUrlState['signin'] = true;
    //   setActivePage(newUrlState);
    //   return;
    // }
    newUrlState[page] = true;
    setActivePage(newUrlState);
    if(page === 'profile'){
      setProfileId(id);
    }
    // setActivePage((prevState) => ({ ...prevState, home: true }));
  }

  return (
    <Fragment>
      {error && <ErrorPopup error={error} ChangePageHandler={ChangePageHandler} setError={setError}/> }
      {activePage['addpost'] &&<AddPost token={token} ChangePageHandler={ChangePageHandler}/>}
      {activePage['home'] && <Home ChangePageHandler={ChangePageHandler} token={token} setError={setError}/>}
      {activePage['profile'] && <Profile id={profileId}/>}
      {activePage['signup'] && <SignUp/>}
      {activePage['signin'] && <SignIn ChangePageHandler={ChangePageHandler} setToken={setToken}/>}
      {/* <Profile/> */}
      {/* <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile/:userId" element={<Profile/>} />
      </Routes> */}
      <Footer activePage={activePage} ChangePageHandler={ChangePageHandler}/>
    </Fragment>
  );
};

export default App;
