import React from 'react';
import {useLocalState} from "../util/useLocalStorage";
import {Navigate} from "react-router-dom";

const PrivateRoute = ({children}) => {
    const [userData, setUserData] = useLocalState({}, "userData");
    return userData.id !== undefined ? children : <Navigate to="/login"/>
};

export default PrivateRoute;