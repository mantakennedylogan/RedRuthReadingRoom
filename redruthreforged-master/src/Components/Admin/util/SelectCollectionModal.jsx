import React, { useEffect, useState, useContext } from 'react'
import { Box, Typography, Modal, TableRow, TableContainer, Table, TableHead, TableCell, TableBody } from '@mui/material'
import axios from '../../../API/axios';
import AdminContext from '../../../Context/AdminContext';

function SelectCollectionModal(props) {
    const { collections, updateCurrCollection, userID } = useContext(AdminContext);

    // Styling
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    const rowStyle = {
		transition: '250ms',
		'&:hover': {
            backgroundColor: '#dae6ed',
        }
	}

    return (
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography sx={{textAlign: 'center'}}>Select a collection to continue</Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell width='70%'>Collection</TableCell>
                                <TableCell width='30%'>New Responses</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {collections.map((collection) => {
							return (
							<TableRow sx={rowStyle} key={collection.collection_id} >
								<TableCell onClick={() => updateCurrCollection(collection.collection_id, collection.title)}>{collection.title}</TableCell>
								<TableCell onClick={() => updateCurrCollection(collection.collection_id, collection.title)}>{collection.unlistened_count}</TableCell>
							</TableRow>
							)
						})}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Modal>
    )
}

export default SelectCollectionModal