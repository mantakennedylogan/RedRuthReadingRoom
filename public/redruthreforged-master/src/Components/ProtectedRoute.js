import React, { useContext, useEffect, useState } from 'react'
import {Navigate, useLocation} from "react-router-dom"
import { AccountContext } from "./Account";


const ProtectedRoute = ({children}) => {
    let location = useLocation();
    const { status, state } = useContext(AccountContext);
    console.log("LoggedIn state: ", state, status);
    console.log("status: " + localStorage.getItem("status"));
    console.log("state: " + localStorage.getItem("state"));

    if(localStorage.getItem("state") == 0) {
        return <Navigate to="/login" state={{ from: location}} replace />
    } else {
        return children
    }

};

export default ProtectedRoute;