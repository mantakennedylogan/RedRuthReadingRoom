import React, { useEffect } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import EditIcon from '@mui/icons-material/Edit';
import PublishIcon from '@mui/icons-material/Publish';
import { Button } from '@mui/material';
import { useContext } from 'react';
import AdminContext from '../../../Context/AdminContext';

// This component returns a button for the admin page sidebar. Style depends on button type, provided in props.

function SidebarButton(props) {
    const { currentView, setCurrentView } = useContext(AdminContext);
    let buttonProps;

    // Styling
    let buttonStyle = {
        borderRadius: '0',
        width: '100%',
        height: '80px',
        backgroundColor: '#323f54',
        color: 'white',
        '&:hover': {
            backgroundColor: 'white',
            color: '#323f54',
        }
    }

    let selectedButtonStyle = { // only difference is non-hover backgroundcolor and color
        borderRadius: '0',
        width: '100%',
        height: '80px',
        backgroundColor: 'white',
        color: '#323f54',
        '&:hover': {
            backgroundColor: 'white',
            color: '#323f54',
        }
    }

    // Logic to determine button behavior and icon
    switch (props.type) {
        case 'home':
            buttonProps = {
                icon: <HomeIcon />,
                onclick: () => setCurrentView('home')
            }
            break;

        case 'inbox':
            buttonProps = {
                icon: <MailIcon />,
                onclick: () => setCurrentView('inbox')
            }
            break;

        case 'edit':
            buttonProps = {
                icon: <EditIcon />,
                onclick: () => setCurrentView('edit')
            }
            break;

        case 'publish':
            buttonProps = {
                icon: <PublishIcon />,
                onclick: () => setCurrentView('publish')
            }
            break;
        
        default:
            break;
    }

    return (
        <Button onClick={buttonProps.onclick} sx={props.type === currentView ? selectedButtonStyle : buttonStyle}>
            {buttonProps.icon}
        </Button>
    )
}

export default SidebarButton