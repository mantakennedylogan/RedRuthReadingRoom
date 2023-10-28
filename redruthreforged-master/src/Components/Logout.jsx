import React, { useContext, useEffect } from 'react'
import { AccountContext } from './Account';

function Logout() {
    const { logout } = useContext(AccountContext);

    useEffect(() => {
        logout()
    }, [])
    
    return (
        <div>Logging Out...</div>
    )
}

export default Logout