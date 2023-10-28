import React from 'react'
import NavbarButton from './NavbarButton'
import { AppBar, Toolbar } from '@mui/material'
import { useContext } from 'react';
import { AccountContext } from '../Account';
import { Box } from '@mui/system';
import AccountMenu from './AccountMenu';

// This component returns the global navbar at the top of the page.
// Returns the navbar and all associated buttons.

function Navbar() {

    const {status} = useContext(AccountContext);
    // Styling
    const navbarStyle = {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: '3',
        backgroundColor: '#323f54',
        padding: 2
    }

    return (
        <AppBar position="fixed" sx={navbarStyle}>
            <Box sx={{ minWidth: 320 }}>
                <NavbarButton link="/" name="Home" />
                <NavbarButton link="/record" name="Record" />
                <NavbarButton link="/listen" name="Listen" />
                <NavbarButton link="/admin" name="Research" />
            </Box>

            <div>
                {status ?
                    <AccountMenu  />
                    :
                    <NavbarButton link="/login" name="LogIn" />
                }
            </div>
        </AppBar>
    )
}

export default Navbar