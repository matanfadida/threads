import { React, Fragment, useContext } from "react";
import Home from "./Home/Home";
import Footer from "./Footer/footer";
import Profile from "./Profile/profile";
import SignUp from "./Account/sign-up";
import SignIn from "./Account/sign-in";
import AddPost from "./Post/AddPost";
import ErrorPopup from "./error/error-popup";
import Loader from "./Loader/loader";
import Context from "./context/context";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const ctx = useContext(Context);
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:Id" element={<Profile />} />
      </Routes>
      {ctx.isLoading && <Loader />}
      {ctx.error && <ErrorPopup />}
      {ctx.activePage["addpost"] && <AddPost />}
      {/* {ctx.activePage["home"] && <Home />} */}
      {/* {ctx.activePage["profile"] && <Profile />} */}
      {ctx.activePage["signup"] && <SignUp />}
      {ctx.activePage["signin"] && <SignIn />}
      <Footer />
    </Fragment>
  );
};

export default App;
