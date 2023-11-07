import React from 'react'
import RecordingTool from './RecordingTool/RecordingTool'
import AudioRecorder from "./AudioRecorder";


function RecordingBox(props) {
    return (
        <div className='recordingbox'>
            <h4>Prompt: {props.prompt}</h4>
            <h5>Description: {props.desc}</h5>
            <p>Ready to record</p>
            <AudioRecorder />      
        </div>
    )
}

export default RecordingBox