import { useState } from "react";
import Context from "./context";

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
  const [token, setToken] = useState("");
  const [activePage, setActivePage] = useState({});

  const ChangePageHandler = (page) => {
    console.log(page,'sadasdsd')
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
  }

    const setLoadingHandler = (error) => {
        setLoading(error);
    }

    const setErrorHandler = (status) => {
        setError(status);
    }

    const setTokenHandler = (token) => {
        setToken(token);
    }

    const cartContext = {
        error,
        ChangePageHandler,
        isLoading,
        setLoadingHandler,
        setErrorHandler,
        activePage,
        token,
        setTokenHandler
      };
    
      return (
        <Context.Provider value={cartContext}>
          {props.children}
        </Context.Provider>
      );
}

export default Provider;