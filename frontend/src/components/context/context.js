import React from 'react';

const Context = React.createContext({
    error: undefined,
    ChangePageHandler: (page) => {},
    setLoadingHandler: (status) => {},
    setErrorHandler: (status) => {},
    isLoading: false,
    activePage: {},
    token:"",
    setTokenHandler: (token) => {},
    showAddPopup: false,
    isAuthenticated: false,
    IsAuthenticatedHandler: () => {}
});

export default Context;