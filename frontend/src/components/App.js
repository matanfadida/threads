import { React, Fragment, useContext, useEffect, useState } from "react";
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

  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      ctx.IsAuthenticatedHandler(true);
      ctx.setTokenHandler(token);
    } else {
      ctx.IsAuthenticatedHandler(false);
    }
    setInitialLoadComplete(true); // Signal that initial load is complete
  }, []); // Run once after the initial render

  // Wait until the initial load is complete before rendering content
  if (!initialLoadComplete) {
    return <Loader />; // Show loading indicator until initial load is complete
  }

  return (
    <Fragment>
      {ctx.isLoading && <Loader />}
      <Routes>
        {ctx.isAuthenticated ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<SignIn />} />
        )}
        <Route path="/profile/:Id" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/activity" element={<Activities />} />
      </Routes>
      {ctx.error && <ErrorPopup />}
      {/* <AddPost /> */}
      <Footer />
    </Fragment>
  );
};

export default App;
