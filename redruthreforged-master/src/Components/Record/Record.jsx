import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from '../../API/axios';
import RecordingBox from './RecordingBox/RecordingBox';
import { Typography } from '@mui/material';

// TODO: Set 

function Record() {
    const [prompt, setPrompt] = useState('');
    const [desc, setDesc] = useState('');
    const [promptID, setPromptID] = useState('');

    const [validatedPrompt, setValidatedPrompt] = useState(false);
    const { prompt_id_url } = useParams();

    //const [prompt_id_url, set_prompt_id_url] = useState(666);

    console.log("prompt id: " + prompt_id_url);
        // useParams();


    // Call database for prompt associated with promptid in queryParameters.
    useEffect(() => {
        if (Number.isInteger(Number(prompt_id_url)) && prompt_id_url !== null && !validatedPrompt) {
            console.log("before axios try block");
            try {
                console.log("inside try block");
                axios.get('/api/getprompt?prompt_id=' + prompt_id_url).then((response) => {
                    console.log("inside axios block");
                    if (response.data !== '') {
                        console.log("inside if statement block");
                        setValidatedPrompt(true);
                        setPromptID(response.data.prompt_id);
                        setPrompt(response.data.prompt);
                        setDesc(response.data.description);
                    }
                    console.log("after if statement");
                });
            } catch (e) {
                console.log("Axios fail :(")
            }
        }
    }, [])


    return (
        <div className='recordpage'>
            {validatedPrompt ?
                <RecordingBox prompt={prompt} desc={desc} promptid={promptID}/>
                :
                <>                
                <Typography sx={{fontSize: 60, m: '10rem', mb:'2rem', fontWeight: 'bold'}} align='center'>Oops theres nothing here!</Typography>
                <Typography sx={{fontSize: 24}} align='center'>Please contact the researcher that sent you this link</Typography>
                </>
            }

            {/* DONT REALLY NEED THIS SINCE THERE IS NO PUBLIC RECORDING LINK ANYMORE - KEEPING UNTIL WE FULLY AGREE ON THIS */}
            {/* {validatedPrompt ?
                <RecordingBox prompt={prompt} desc={desc} promptid={promptID}/>
                :
                <>
                <p>Welcome to the record page! Since you didn't put a promptid in your url (or it's not valid for whatever reason), here are some instructions on how to record.</p>
                <ol>
                    <li>Contact your researcher and get the direct prompt link from them.</li>
                    <li>Review the prompt on the screen before beginning recording.</li>
                    <li>Click the large record button to begin recording. NOTE, you may have to grant permissions for your web browser to access your microphone.</li>
                    <h3>INSTRUCTIONS IMAGE HERE</h3>
                    <li>Once you're done recording, click the large record button to stop recording. If the timer runs out, the recording will stop automatically.</li>
                    <li>Enter the required information (denoted with an asterisk), then optionally fill out the remaining fields. The optional information will likely help the researcher.</li>
                    <li>Hit submit and you're done!</li>
                </ol>
            </>} */}
        </div>
    )
}

export default Record