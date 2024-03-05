import React, { useState, useEffect } from 'react'
import { Box, Select, MenuItem, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Modal, TextField } from '@mui/material'
import axios from '../../../API/axios';


// This component returns a button that handles new collection creation.
// Returns a button and associated modal (controlled by button)

function GetPromptURL() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setCollectionName("")
        setPromptName("")
        setText("")
        setOpen(false);
    }

    const [p_name, setp_name] = useState("");
    const [p_description, setp_description] = useState("");
    const [listOfUserCollections, setlistOfUserCollections] = React.useState([])
    const [collectionName, setCollectionName] = React.useState("")
    const [collectionID, setCollectionID] = React.useState(0)
    const [listOfPrompts, setListOfPrompts] = React.useState([])
    const [promptName, setPromptName] = React.useState("")
    const [text, setText] = React.useState("")


    // Styling
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '30%',
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    async function handleSubmit (event) {
        event.preventDefault();
        if(collectionName == ""){
            setText("Invalid Collection Name")
            return
        }
        if(promptName == ""){
            setText("Invalid Prompt Name")
            return
        }
        console.log(promptName)
        var pid = await axios.get('/api/admin/getPromptId?prompt_name='+promptName)
        console.log(pid)
        setText("https://redruth-reading-room-ten.vercel.app/record/" + pid.data[0].prompt_id)

        // setOpen(false)
        // window.location.reload()
    }

    // const getCollectionID = async() => {
    //     setCollectionID(await axios.get('/api/admin/getCollectionId?collection_name='+collectionName));
        
    // }

    async function handelCollectionChange(e){
        setCollectionName(e.target.value);
        var tempID = await axios.get('/api/admin/getCollectionId?collection_name='+e.target.value);
        setCollectionID(tempID.data[0].collection_id);
        getPrompts(e.target.value)
      }
    
    const getPrompts = async(collName) =>{
        let collectionID = await axios.get('/api/admin/getCollectionId?collection_name='+collName)
        let promptNames = await axios.get('/api/admin/promptByCollection?collection_id='+collectionID.data[0].collection_id)
        console.log(promptNames)
        if (promptNames.data.length != 0){
            console.log("HERE")
            setListOfPrompts(promptNames.data)
            setPromptName(promptNames.data[0].prompt)
        }
        else{
            console.log("THIS")
           // var nothing = [prompt = "Ther Are No Prompts In This Collection"]
            setListOfPrompts(["NA"])
            setPromptName("")
            setText("There Are No Prompts In This Collection")
            
        }
        
    } 
    const getColections = async() =>{
        let bob = await axios.get('/api/admin/getusercollections?user_id=12345')
        setlistOfUserCollections(bob.data)
    }
    async function handelPromptChange(e){
        setPromptName(e.target.value)
    }

    useEffect(() =>{
        getColections()
      },[])

    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleOpen} sx={{backgroundColor: '#323f54'}}>Get Sharable Link</Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmit}> 
                        <Typography variant='h5'>
                            Get Sharable Link
                        </Typography>

                        <br />
                        <Box sx={{width: "400px", paddingRight: 3}}>
                            <Typography>{'Collection'}</Typography>
                            <Select sx={{width: '100%', maxWidth: '400px', minWidth: '80px'}}
                            value={collectionName}
                            label="Collection"
                            onChange={handelCollectionChange}>
                                {listOfUserCollections.map((collectoins) => {
                                    return (
                                        <MenuItem value={collectoins.title}>{collectoins.title}</MenuItem>
                                    )
                                })}
                            </Select>
                            <Typography>{'Prompt'}</Typography>
                            <Select sx={{width: '100%', maxWidth: '400px', minWidth: '80px'}}
                            value={promptName}
                            label="Prompt"
                            onChange={handelPromptChange}>
                                {listOfPrompts.map((prompts) => {
                                    return (
                                        <MenuItem value={prompts.prompt}>{prompts.prompt}</MenuItem>
                                    )
                                })}
                            
                            </Select>
                        </Box>
                        <br />
                        <Typography>{text}</Typography>
                        <br />
                        <input type="submit" value={'Get Link'} style={{marginTop: '3rem', background:'#323f54', color: '#faf9f6', fontSize: 20, borderRadius: 5, padding: 10, paddingLeft:20, paddingRight:20 }}/>
                    </form>
                </Box>
            </Modal>
        </React.Fragment>
    )
}

export default GetPromptURL