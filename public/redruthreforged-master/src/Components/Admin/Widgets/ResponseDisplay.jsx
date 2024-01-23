import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'
import AdminContext from '../../../Context/AdminContext';

// This component returns the panel dedicated to displaying information about the currently selected response.
// Returns ... to be worked on.

function ResponseDisplay() {
	const { currentResponse } = useContext(AdminContext);

    // Styling
    const bodyStyle = {
        padding: 2,
        height: '100vh',
    }

    const downshift = {
        paddingTop: 9
    }

    const title = {
        textAlign: 'center',
        py: 6
    }

    const subtitleStyle = {
        color: '#555555',
        paddingTop: 3,
        paddingBottom: 1
    }

    return (
        <Box sx={bodyStyle}>
            <Box sx={downshift}>
                <Typography variant='h5' sx={title}>{currentResponse.title}</Typography>

                <Box sx={{ width: '100%', height: 150, border: '1px solid black' }}>Audio Playback Goes Here</Box>

                <Typography variant='body2' sx={subtitleStyle}>Comments</Typography>
                <Typography variant='body2'>{currentResponse.remarks ? currentResponse.remarks : "No remarks included."}</Typography>

                <Typography variant='body2' sx={subtitleStyle}>Prompt</Typography>
                <Typography variant='body2'>{currentResponse.prompt}</Typography>

                <Typography variant='body2' sx={subtitleStyle}>Metadata</Typography>
                <Typography variant='body2'>Metadata Here</Typography>
            </Box>
        </Box>
    )
}

export default ResponseDisplay