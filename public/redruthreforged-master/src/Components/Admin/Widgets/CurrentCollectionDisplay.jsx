import React, { useContext } from 'react'
import { Typography } from '@mui/material'
import AdminContext from '../../../Context/AdminContext'

// This component returns information about the currently selected collection

function CurrentCollectionDisplay() {
    const { currentCollection, currentView } = useContext(AdminContext);

    return (
        <Typography variant='subtitle1' sx={{
            color: '#3c4149',
            paddingBottom: 3,
            paddingLeft: 0
        }}>
        {currentView.toUpperCase()} / {currentCollection.collection_id ?
                currentCollection.title.toUpperCase()
                : "Select a collection"}
        </Typography>
    )
}

export default CurrentCollectionDisplay