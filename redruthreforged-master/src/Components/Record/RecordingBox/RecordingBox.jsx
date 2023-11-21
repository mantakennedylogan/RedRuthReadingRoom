import React from 'react'
import AudioRecorder from "./AudioRecorder";
import SubmitForm from './SubmitForm';


function RecordingBox(props) {
    return (
        <div className='recordingbox'>
            <h4>Prompt: {props.prompt}</h4>
            <h5>Description: {props.desc}</h5>
            <p>Ready to record</p>
            <AudioRecorder />  
            <SubmitForm />    
        </div>
    )
}

export default RecordingBox