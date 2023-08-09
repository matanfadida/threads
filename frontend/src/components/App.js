import {React, Fragment, useState} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './Home/Home';
import Footer from "./Footer/footer";
import Profile from "./Profile/profile";
import SignUp from "./Account/sign-up";


const initUrlState = {
  'home': false,
  'search': false,
  'profile': false,
  'addpost': false,
  'active': false,
  'signup': true,
};
const USERIDDEFAULD = "1";
const App = () => {
  const [activePage, setActivePage] = useState(initUrlState);
  const [profileId, setProfileId] = useState('USERIDDEFAULD');
  const ChangePageHandler = (page, id=USERIDDEFAULD) => {
    const newUrlState = {
      'home': false,
      'search': false,
      'profile': false,
      'addpost': false,
      'active': false
    };
    newUrlState[page] = true;
    setActivePage(newUrlState);
    if(page === 'profile'){
      setProfileId(id);
    }
    // setActivePage((prevState) => ({ ...prevState, home: true }));
  }

  return (
    <Fragment>
      {activePage['home'] && <Home ChangePageHandler={ChangePageHandler}/>}
      {activePage['profile'] && <Profile id={profileId}/>}
      {activePage['signup'] && <SignUp/>}
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
