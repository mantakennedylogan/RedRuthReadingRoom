import { Button } from '@mui/material'
import React, { useState } from 'react'
import axios from '../../../API/axios';

// This component returns a button for toggling between public and private LISTEN status of a collection.

function PublicListenButton(props) {
	const [isPublic, setIsPublic] = useState(props.public_flg === 1 ? true : false);

	// Styling
	const buttonStyleOpen = {
		width: '100px',
		backgroundColor: 'transparent',
		color: '#0091ff',
		boxShadow: 'inset 0px 0px 0px 2px #0091ff',
		'&:hover': {
			backgroundColor: 'transparent',
			boxShadow: 'inset 0px 0px 2px 3px #0091ff'
		}
	}

	const buttonStyleClosed = {
		width: '100px',
		backgroundColor: 'transparent',
		color: '#545454',
		boxShadow: 'inset 0px 0px 0px 2px #545454',
		'&:hover': {
			backgroundColor: 'transparent',
			boxShadow: 'inset 0px 0px 2px 3px #545454'
		}
	}

	// Helper function, makes request to the API to flip the public flag of the collection.
	const togglePublic = (e) => {
		e.preventDefault();
		axios.get('/api/admin/update/collectionpubliclistenflg?collection_id=' + props.collection_id + '&public_listen_flg=' + isPublic).then((response) => {
			if (response) {
				setIsPublic(!isPublic)
			}
		});
	}

	return (
		<Button onClick={(e) => togglePublic(e)} sx={isPublic ? buttonStyleOpen : buttonStyleClosed}>{isPublic ? "Published" : "Draft"}</Button>
	)
}

export default PublicListenButton