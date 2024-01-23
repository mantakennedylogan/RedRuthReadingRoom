import { Box, Typography, TableRow, TableContainer, Table, TableHead, TableCell, TableBody, TableSortLabel, responsiveFontSizes } from '@mui/material';
import React, { useContext, useState, useEffect, useRef } from 'react'
import AdminContext from '../../../Context/AdminContext';
import SelectCollectionModal from '../util/SelectCollectionModal';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import axios from '../../../API/axios';
import moment from 'moment';
import OptionPicker from '../util/OptionPicker';
import FilterPrompts from '../util/FilterPrompts';



function AdminInbox() {
	const { currentCollection, updateCurrResponse, clearCurrResponse, userID } = useContext(AdminContext);
	
	const [newResponses, setNewResponses] = useState([]);
	const [loading, setLoading] = useState(true);

	const filterOptions = useRef(['All']); // Note: useRef means varName is accessed by varName.current, not just varName
	const [filterOptionIdx, setFilterOptionIdx] = useState(0);

	const sortOptions = useRef([ // Note: useRef means varName is accessed by varName.current, not just varName
		{
			optionName: 'Date (asc)',
			optionFunc: (a, b) => { return a.timestamp < b.timestamp ? -1 : 1 }
		},
		{
			optionName: 'Date (desc)',
			optionFunc: (a, b) => { return a.timestamp < b.timestamp ? 1 : -1 }
		},
		{
			optionName: 'Length (asc)',
			optionFunc: (a, b) => { return a.file_length < b.file_length ? -1 : 1 }
		},
		{
			optionName: 'Length (desc)',
			optionFunc: (a, b) => { return a.file_length < b.file_length ? 1 : -1 }
		}
	])
	const [sortOptionIdx, setSortOptionIdx] = useState(0);


	// Styling
	const rowStyle = {
		transition: '250ms',
		'&:hover': {
            backgroundColor: '#dae6ed',
        }
	}
	const secondaryText = {
		color: '#3c4149'
	}
	const optionStyle = {
		display: "flex",
		paddingTop: 3,
		paddingBottom: 3,
	}

	// Helper funct for seconds -> minutes:seconds
	function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}

	// Helper funct for retrieving response information
	const getRecording = (file_id) => {
		axios.get('/api/admin/getrecording?file_id=' + file_id).then((response) => {
			if (response.data !== '') {
                updateCurrResponse(response.data[0])
			}
		});
	}

	if (currentCollection.collection_id === null) {
		return (
			<SelectCollectionModal/>
		)
	} else if (loading) {
		axios.get('/api/admin/getunlistenedrecordingsbycollection?user_id=' + userID + "&collection_id=" + currentCollection.collection_id).then((response) => {
			if (response.data !== '') {
				let responses = response.data;

				// Use Set object to build array of unique prompts + 'All' option
				let filterSet = new Set();
				filterOptions.current.forEach(option => filterSet.add(option))
				responses.map(item => item.prompt).forEach(option => filterSet.add(option))

                setNewResponses(responses);
				filterOptions.current = [...filterSet]
			}
			setLoading(false);
		});

		return (
			<div>Loading...</div>
		)
	} else {
		return (
			<Box>
				<Typography variant='h4'>Prompts</Typography>

				<Box sx={optionStyle}>
					<OptionPicker name="Prompt" options={filterOptions.current} currOption={filterOptionIdx} changeOptionFunc={setFilterOptionIdx} sx={{width: "400px", paddingRight: 3}}/>

					<OptionPicker name="Sort by" options={sortOptions.current.map(a => a.optionName)} currOption={sortOptionIdx} changeOptionFunc={setSortOptionIdx} sx={{width: "400px"}}/>
				</Box>

				<Typography variant='h4'>Recordings</Typography>
				<TableContainer>
				<Table>
					<TableHead> 
						<TableRow>
							<TableCell>Response Title</TableCell>
							<TableCell>Prompt</TableCell>
							<TableCell width={150}>Date Recorded</TableCell>
							<TableCell width={50}><AccessTimeIcon /></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{newResponses.length > 0 ? 
							newResponses
							.filter((response) => filterOptions.current[filterOptionIdx] === "All" ? 
								true
								: response.prompt === filterOptions.current[filterOptionIdx])
							.sort(sortOptions.current[sortOptionIdx].optionFunc)
							.map((response) => {
								return (
								<TableRow sx={rowStyle} key={response.file_id} onClick={() => getRecording(response.file_id)}>
									<TableCell>{response.title}</TableCell>
									<TableCell sx={secondaryText}>{response.prompt}</TableCell>
									<TableCell sx={secondaryText}>{moment.utc(response.timestamp).format("MMM Do, YYYY")}</TableCell>
									<TableCell sx={secondaryText}>{fmtMSS(response.file_length)}</TableCell>
								</TableRow>
								)
							}) 
							
						: <TableRow>
							<TableCell colSpan={4} sx={{textAlign: 'center', color: '#3c4149'}}>No new responses.</TableCell>
						</TableRow>}
					</TableBody>
				</Table>
			</TableContainer>
	
			</Box>
		)
	}
}

export default AdminInbox