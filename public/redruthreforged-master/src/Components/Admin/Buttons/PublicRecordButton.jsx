import { Button } from '@mui/material'
import React, { useState } from 'react'
import axios from '../../../API/axios';

// This component returns a button for toggling between public and private LISTEN status of a collection.

function PublicRecordButton(props) {
    const [isPublic, setIsPublic] = useState(props.public_flg === 1 ? true : false);

    // Styling
    const buttonStyleOpen = {
        width: '100px',
        backgroundColor: '#30a330',
        color: 'white',
        '&:hover': {
            backgroundColor: '#60c360',
            boxShadow: '0px 0px 2px 1px #60c360'

        }
    }

    const buttonStyleClosed = {
        width: '100px',
        backgroundColor: '#545454',
        color: 'white',
        '&:hover': {
            backgroundColor: '#858585',
            boxShadow: '0px 0px 2px 1px #858585'
        }
    }

    // Helper function, makes request to the API to flip the public flag of the collection.
    const togglePublic = () => {
        axios.get('/api/admin/update/collectionpublicrecordflg?collection_id=' + props.collection_id + '&public_record_flg=' + isPublic).then((response) => {
            if (response) {
                setIsPublic(!isPublic)
            }
        });
    }

    return (
        <Button onClick={() => togglePublic()} sx={isPublic ? buttonStyleOpen : buttonStyleClosed}>{isPublic ? "Open" : "Closed"}</Button>
    )
}

export default PublicRecordButton