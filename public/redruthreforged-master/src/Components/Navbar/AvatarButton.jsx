import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function AvatarButton(props) {
	const navButtonStyle = {
		border: '1px sold white',
		paddingRight: '15px',
		fontSize: '30px'
	}

	const linkStyle = {
		textDecoration: 'none',
		color: 'white'
	}

	return (
		<Button>
			<Typography>
				<Link to={props.link} style={linkStyle}><AccountCircleIcon fontSize='small'></AccountCircleIcon></Link>
			</Typography>

		</Button>

	)
}

export default AvatarButton