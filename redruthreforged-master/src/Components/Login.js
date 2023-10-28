import React, { useState, useContext } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom"
import { AccountContext } from "./Account";
import { Box } from '@mui/material'


const Login = () => {
    // Email and Pssword variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const navigateToSignUp = () => {
        navigate('/SignUp');
    };

    const { status, setStatus, authenticate } = useContext(AccountContext);

    const onSubmit = (event) => {
        event.preventDefault();

        authenticate(email, password)
            // set log in status to true and cookie true
            .then(data => {
                console.log("Logged in!", data);
                setStatus(true);
                localStorage.setItem("state", 1);
                navigate("/admin")
            })
            .catch(err => {
                console.log("Failed to login", err);
            });
    };

        let location = useLocation();
        // Html form itself with inputs
            return (
            <Box>
                <form onSubmit={onSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    ></input>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    ></input>
                    <button type="submit">Login</button>
                </form>
                <h3>Don't have an account?</h3>
                <button onClick={navigateToSignUp}>SignUp</button>
            </Box>
            );
        };
    

export default Login