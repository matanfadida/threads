import {React, Fragment} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './Home/Home';
import Footer from "./Footer/footer";
import Profile from "./Profile/profile";

const App = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile/:userId" element={<Profile/>} />
      </Routes>
      <Footer/>
    </Fragment>
  );
};

export default App;
