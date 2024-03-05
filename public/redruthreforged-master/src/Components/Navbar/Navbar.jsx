import React from 'react'
import NavbarButton from './NavbarButton'
import { AppBar, Toolbar } from '@mui/material'
import { useContext } from 'react';
import { AccountContext } from '../Account';
import { Box } from '@mui/system';
import AccountMenu from './AccountMenu';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material'

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
            <Box> 
                <Button>
                    <Typography>
                        <Link to={"/"} style={{textDecoration: 'none',
		                    color: 'white', fontWeight: 'bold', fontSize: "1.10rem",}}>REDRUTH READING ROOM</Link>
                    </Typography>
                </Button>
            </Box>
        
            <Box sx={{display:'flex'}}>
                
                <div>
                    {status ?
                        <AccountMenu  />
                        :
                        <NavbarButton link="/login" name="LogIn" />
                    }
                </div>
            </Box>   
        </AppBar>
    )
}

export default Navbar