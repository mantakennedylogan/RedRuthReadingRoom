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

        </div>
    )
}

export default Record