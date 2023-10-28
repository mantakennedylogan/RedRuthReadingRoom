import React from 'react'
import { Drawer, Toolbar } from '@mui/material'
import SidebarButton from '../Buttons/SidebarButton'

// Returns sidebar for admin page.
// Returns four buttons, one for each view

function Sidebar() {

    // Styling
    const sidebarStyle = {
        position: 'relative',
		zIndex: '2',
		'& .MuiDrawer-paper': {
			backgroundColor: '#323f54',
			width: '80px',
            borderRight: 'none',
            paddingTop: 8
		},
	}

    return (
        <Drawer
            sx={sidebarStyle}
            variant="permanent"
            anchor="left"
        >
            <SidebarButton type='home' />
            <SidebarButton type='inbox' />
            <SidebarButton type='edit' />
            <SidebarButton type='publish' />
        </Drawer>
    )
}

export default Sidebar