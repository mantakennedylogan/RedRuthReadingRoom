import { useEffect, useContext, useState } from "react";
import { AccountContext } from "./Account";
import ChangePassword from "./ChangePassword";

export default () => {
    const { status, data } = useContext(AccountContext);
    return (
        <div className = "settings">
            <h2>Settings</h2>
            <h3>Hello </h3>
            <ChangePassword/>
             
        </div>
    );
};
