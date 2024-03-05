import React, { useState, useContext } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom"
import { AccountContext } from "./Account";
import { Box } from '@mui/material'
import './Record/RecordingBox/Form.css'


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

    function MouseOver(event) {
        event.target.style.background = '#6b86b3';
    }
	function MouseOut(event){
		event.target.style.background='#323f54';
	}

        let location = useLocation();
        // Html form itself with inputs
            return (
            <Box>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={{textAlign: 'center', width: '50%'}}>
                        <div className="form-box">
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
                                <button type="submit" onMouseOver={MouseOver} onMouseOut={MouseOut} style={{marginTop: '3rem', background:'#323f54', color: '#faf9f6', fontSize: 25, borderRadius: 5, padding: 15, paddingLeft:40, paddingRight:40}}>Login</button>
                            </form>

                            <br></br>
                            <br></br>
                            <br></br>
                            <h2 >Don't have an account?</h2>
                            <button onClick={navigateToSignUp} onMouseOver={MouseOver} onMouseOut={MouseOut} style={{marginTop: '3rem', background:'#323f54', color: '#faf9f6', fontSize: 25, borderRadius: 5, padding: 15, paddingLeft:40, paddingRight:40}}>SignUp</button>
                        </div>
                    </div>
                </div>
                
            </Box>
            );
        };
    

export default Login