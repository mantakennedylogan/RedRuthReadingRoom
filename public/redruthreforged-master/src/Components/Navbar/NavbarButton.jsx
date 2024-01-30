import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'

function NavbarButton(props) {
	const navButtonStyle = {
		border: '1px sold white',
		paddingRight: '15px',
		fontSize: '25px'
	}

	const linkStyle = {
		textDecoration: 'none',
		color: 'white'
	}

	return (
		<Button>
			<Typography>
				<Link to={props.link} style={linkStyle}>{props.name}</Link>
			</Typography>
		</Button>
	)
}

export default NavbarButton