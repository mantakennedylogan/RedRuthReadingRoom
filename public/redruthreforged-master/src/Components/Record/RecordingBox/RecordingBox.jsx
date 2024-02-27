import React from 'react'
import AudioRecorder from "./AudioRecorder";
import SubmitForm from './SubmitForm';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import './Form.css';


function RecordingBox(props) {
    
    const textBox = {
        mt: 'auto', //'10rem',
        width: '65%',
        mx: 'auto'//'20rem'
        
    }
    
    return (
        <>
            {/* ORIGINAL - NOT STYLED */}
            {/* <div className='recordingbox'>
                <h4>Prompt: {props.prompt}</h4>
                <h5>Description: {props.desc}</h5>
                <p>Ready to record</p>
                <AudioRecorder />  
                <SubmitForm />    
            </div> */}
        
            {/* DUMMY DATA */}
            {/* <Box>
                <Box sx={textBox}>
                    <Typography sx={{fontSize: 40}} align='center'>How did you spend your time During Covid lockdown?</Typography>
                    <Typography sx={{fontSize: 24}} align='center'>Descibe the activites and people you were with during this time.</Typography>
                    <Typography sx={{fontSize: 12, width: '70%', mx: '12rem', mt: '2rem'}} align='center'>Note: Tap the icon below to activate your device's microphone. When the icon turns red, your device's microphone is enabled, and when it turns green, it indicates that the microphone is actively recording. Press the icon once more to stop recording. To initiate a new recording, tap the red microphone icon.</Typography>
                    <AudioRecorder />  
                </Box>
            </Box> */}

            {/* DISPLAY INPUT FROM DATABASE */}
            <div className='body'>
            <Box>
                <Box sx={textBox}>
                    <br></br><br></br>
                    <Typography sx={{fontSize: 40, backgroundColor:'#323f54', color:'whitesmoke'}} align='center'>{props.prompt}</Typography>
                    <Typography sx={{fontSize: 24}} align='center'>{props.desc}</Typography>
                    
                    <AudioRecorder prompt_id = {props.promptid}/>  
                </Box>
            </Box>
            </div>

        </>

        

    )
}
//, width: '70%', mx: '12rem', mt: '2rem'
export default RecordingBox