import React, { useState, useContext } from "react";
import { AccountContext } from "./Account";
import './Record/RecordingBox/Form.css'
export default () => {

    const[password, setPassword] = useState("");
    const[newPassword, setNewPassword] = useState("");

    const {getSession} = useContext(AccountContext);

    const onSubmit = (event) => {
        event.preventDefault();

        getSession().then(({user}) =>{
            user.changePassword(password, newPassword, (err, result) => {
                if (err) {
                    console.error(err);
                }
                else{
                    console.log(result);
                }
            });
        });
    };

    function MouseOver(event) {
        event.target.style.background = '#6b86b3';
    }
	function MouseOut(event){
		event.target.style.background='#323f54';
	}

    return(
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={{textAlign: 'center', width: '50%'}}>
                        <div className="form-box">
                            <form onSubmit={onSubmit}>
                                <label>Current Password</label>
                                <input
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />

                                <label>New Password</label>
                                <input
                                    value={newPassword}
                                    onChange={(event) => setNewPassword(event.target.value)}
                                />

                                <button type="submit" onMouseOver={MouseOver} onMouseOut={MouseOut} style={{marginTop: '3rem', background:'#323f54', color: '#faf9f6', fontSize: 25, borderRadius: 5, padding: 15, paddingLeft:40, paddingRight:40}}>Change Password</button>
                            </form>
                        </div>
                    </div>
        </div>
    );
};