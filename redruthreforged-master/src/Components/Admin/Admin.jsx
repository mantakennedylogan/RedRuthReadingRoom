import React, { useState, useContext, useEffect } from 'react'
import AdminContext from '../../Context/AdminContext'
import axios from '../../API/axios'
import { Box, Toolbar, Typography } from '@mui/material'
import Sidebar from './Widgets/Sidebar'
import ResponseDisplay from './Widgets/ResponseDisplay'
import CurrentCollectionDisplay from './Widgets/CurrentCollectionDisplay'
import ContentSwitcher from './Content/ContentSwitcher'

/*
	MAIN ADMIN PAGE

	Locked behind logging in!

	Handles rendering of whole admin page and the four views.
	Renders sidebar, main content (views), and responseDisplay panel (view-dependent).
*/

function Admin() {
	const { collections, setCollections, currentCollection, setCurrentCollection, promptID, setPromptID, currentResponse, setCurrentResponse, userID, setUserID, currentView, setCurrentView } = useContext(AdminContext);
	const [loading, setLoading] = useState(true);

	// Styling
	const contentArea = {
		display: "flex",
		justifyContent: 'space-between'
	}

	const mainContentBox = {
		backgroundColor: 'white',
		width: '100%',
		paddingLeft: 13,
		paddingRight: 3,
		paddingTop: 3,
		paddingBottom: 3
	}

	const responseDisplayBox = {
		backgroundColor: '#dae6ed',
		width: '420px',
		minWidth: '420px',
		marginTop: -13
	}

	// On component load, makes request to API to get current users collections.
	useEffect(() => {
		axios.get('/api/admin/getusercollections?user_id=' + userID).then((response) => {
			if (response.data !== '') {
				setCollections(response.data)
			}
		});
		setLoading(false); // Sets loading status to complete, regardless of if API request was successful.
	}, [])

	if (loading) {
		return (<div>Loading...</div>)
	}

	return (
		<Box>
			<Sidebar />
			<Box sx={contentArea}>
				<Box sx={mainContentBox}>
					<CurrentCollectionDisplay />
					<ContentSwitcher />
				</Box>

				<Box sx={currentResponse.file_id != null ? responseDisplayBox : {display: 'none'}}>
					<ResponseDisplay />
				</Box>
			</Box>
		</Box>
	)
}

export default Admin