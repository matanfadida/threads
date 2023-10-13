import { useState } from "react";
import Context from "./context";
import { useNavigate } from "react-router-dom";

// const initUrlState = {
//     'home': false,
//     'search': false,
//     'profile': false,
//     'addpost': false,
//     'active': false,
//     'signup': false,
//     'signin': true,
//   };

const Provider = (props) => {
  const [error, setError] = useState(undefined);
  const [isLoading, setLoading] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState({});

  const ChangePageHandler = (page) => {
    const newUrlState = {
      home: false,
      search: false,
      profile: false,
      addpost: false,
      active: false,
      signup: false,
      signin: false,
    };
    const userId = localStorage.getItem("userId");
    // const token = localStorage.getItem('token');
    // if(!token){
    //   newUrlState['signin'] = true;
    //   setActivePage(newUrlState);
    //   return;
    // }
    newUrlState[page] = true;
    setActivePage(newUrlState);
    switch (page) {
      case "home":
        navigate("/");
        break;
      case "search":
        navigate("/search");
        break;
      case "profile":
        navigate(`/profile/${userId}`);
        break;
      case "addpost":
        setShowAddPopup(!showAddPopup);
        break;
      case "activity":
        navigate(`/activity`);
        break;
      case "signin":
        navigate(`/signin`);
        break;
      default:
      // code block
    }
  };

  const setLoadingHandler = (error) => {
    setLoading(error);
  };

  const setErrorHandler = (status) => {
    setError(status);
  };

  const setTokenHandler = (token) => {
    setToken(token);
  };

  const cartContext = {
    error,
    ChangePageHandler,
    isLoading,
    setLoadingHandler,
    setErrorHandler,
    activePage,
    token,
    setTokenHandler,
    showAddPopup,
  };

  return (
    <Context.Provider value={cartContext}>{props.children}</Context.Provider>
  );
};

export default Provider;
