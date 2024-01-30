import React, { useState } from "react";
import UserPool from "../UserPool";
import { Box } from '@mui/material'

const SignUp = () => {
    // Email and Pssword variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();

        UserPool.signUp(email, password, [], null, (err, data) => {
            if (err) {
                console.error(err);
            }
            //send username from Cognito to the Server to be Sent to the DB
           /* axios.get('/api/account/update/on/signup?acct_username=' + user_id + '&acct_username=' + user.Username).then((response) => {
                if (response.data !== '') {
                  console.log("Updated Username");
                }
              });*/
            console.log(data);
        });
    };

    const style = {
        paddingTop: 8
    }

    return (
        // Html form itself with inputs
        <Box sx={style}>
            <form onSubmit={onSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                ></input>
                <label htmlFor="password">Password</label>
                <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                ></input>
                <label htmlFor="name">Name</label>

                <button type="submit">Signup</button>
            </form>
        </Box>
    );
};

export default SignUp;