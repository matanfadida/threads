import { React, Fragment, useContext } from "react";
import Home from "./Home/Home";
import Footer from "./Footer/footer";
import Profile from "./Profile/profile";
import SignUp from "./Account/sign-up";
import SignIn from "./Account/sign-in";
import Search from "./Search/search";
import AddPost from "./Post/AddPost";
import ErrorPopup from "./error/error-popup";
import Loader from "./Loader/loader";
import Context from "./context/context";
import { Route, Routes } from "react-router-dom";
import Activities from "./Activity/activities";

const App = () => {
  const ctx = useContext(Context);
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:Id" element={<Profile />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/search" element={<Search />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/activity" element={<Activities />} />
      </Routes>
      {ctx.isLoading && <Loader />}
      {ctx.error && <ErrorPopup />}
      <Footer />
    </Fragment>
  );
};

export default App;
