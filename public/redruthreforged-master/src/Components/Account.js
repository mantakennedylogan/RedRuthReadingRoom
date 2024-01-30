import React, {createContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom"
import Pool from "../UserPool";
import axios from '../../src/API/axios'
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

const AccountContext = createContext();

const Account = (props) => {
    const[status, setStatus] = useState(localStorage.getItem("state"));
    const navigate = useNavigate();
    const[currentUser, setCurrentUser] = useState({});

    // Returns information when user logs in, returns promise
    const getSession = async () => {
        return await new Promise((resolve, reject) => {
            const user = Pool.getCurrentUser();
            if(user) {
                // if user does exist, grab session
                user.getSession(async (err, session) => {
                    if (err){
                        reject();
                    } else {
                        const attributes = await new Promise((resolve, reject) => {
                            user.getUserAttributes((err, attributes) => {
                                if(err){
                                    reject(err);
                                }
                                else{
                                    const results = {};
        
                                    for (let attribute of attributes) {
                                        const {Name, Value} = attributes;
                                        results[Name] = Value;
                                    }
                                    resolve(results);
                                }
                            });
                        });
                        resolve({user, ...session, ...attributes});
                    }
                });
            } else {
                reject(); // if no user
            }

        });
    };

    // Authenticates and returns JWT token
    const authenticate = async (Username, Password) => {
       return await new Promise((resolve, reject) => {
        const user = new CognitoUser({ Username, Pool});
        
        const authDetails = new AuthenticationDetails({ Username,Password });
        user.authenticateUser(authDetails, {
             onSuccess: (data) =>{
                 console.log("onSuccess: ", data);
                 resolve(data);

                 //get account ID and other information
                 axios.get('/api/account/getaccountdetails?username=' + user.Username).then((response) => {
                    if (response.data !== '') {
                      // do something if the response.data is not empty, probably something like the following
                      // response.data should be an array, where the items in the array are the rows returned
                      setCurrentUser(response.data[0]);
                      console.log(currentUser.user_id);
                      console.log(currentUser.email);
                      console.log(currentUser.name);
                      console.log(currentUser.phone);
                      console.log(currentUser.postal); 
                    }
                  });
             },
             onFailure: (err) =>{
                 console.error("onFailure: ", err);
                 reject(err);
             },
             newPasswordRequired: (data) =>{
                 console.log("newPasswordRequired: ", data);
                 resolve(data);
             },
        });
       });
    };
    
    // Sign Out function
    const logout = () => {
        const user = Pool.getCurrentUser();
        if (user){
            user.signOut(); // cognito sign out method
            setStatus(false);
            localStorage.setItem("state", 0);
        }
        navigate("/")
    }

    return(
        <AccountContext.Provider value = {{ setCurrentUser, currentUser, authenticate, getSession, logout, status, setStatus }}>
         {props.children}
        </AccountContext.Provider>
    );
};

export { Account, AccountContext };