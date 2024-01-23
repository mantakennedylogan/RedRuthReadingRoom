import React, { useState } from 'react'
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Modal } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

// This component returns a button that handles new collection creation.
// Returns a button and associated modal (controlled by button)

function CreateCollectionButton() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    return (
        <React.Fragment>
            <TableRow>
                <TableCell colSpan={5} sx={{
                    textAlign: 'center',
                    color: '#323f54'
                }}>
                    <Button onClick={handleOpen} sx={{
                        width: '100%',
                        '&:hover': {
                            backgroundColor: '#dae6ed',
                        }
                    }}><AddIcon /></Button>
                </TableCell>
            </TableRow>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography>Create Collection Logic Placeholder</Typography>
                </Box>
            </Modal>
        </React.Fragment>
    )
}

export default CreateCollectionButton