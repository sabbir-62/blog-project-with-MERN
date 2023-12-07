// DataProvider.jsx
import { createContext, useState } from "react";
import PropTypes from 'prop-types';

// Data context
const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [account, setAccount] = useState({
        name: "",
        email: "",
        userName: ""
    });

    return (
        <DataContext.Provider value={{
            account,
            setAccount
        }}>
            {children}
        </DataContext.Provider>
    );
};

DataProvider.propTypes = {
    children: PropTypes.node.isRequired,
};




// Login Context
const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    return (
        <LoginContext.Provider value={{ isLoggedIn, setLoggedIn }}>
            {children}
        </LoginContext.Provider>
    );
};

LoginProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export {
    DataContext,
    DataProvider,
    LoginContext,
    LoginProvider,
};
