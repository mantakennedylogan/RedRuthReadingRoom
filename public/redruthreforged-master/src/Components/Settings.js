import { useEffect, useContext, useState } from "react";
import { AccountContext } from "./Account";
import ChangePassword from "./ChangePassword";

export default () => {
    const { status, data } = useContext(AccountContext);
    return (
        <div className = "settings">
            <br></br>
            <h1 style={{textAlign: 'center'}}>Settings</h1>
            <br></br>
            <ChangePassword/>
             
        </div>
    );
};
