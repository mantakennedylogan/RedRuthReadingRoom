
import { useState, useRef, useEffect} from "react";

import disabledMic from "../../../images/disabledMic.png";
import neutralMic from "../../../images/neutralMic.png";
import recordingMic from "../../../images/recordingMic.png";
import axios from '../../../API/axios';
const mimeType = "audio/webm";

let gumStream = null;
let recorder = null;
let audioContext = null;

const NewRecorder = () => {
    const [permission, setPermission] = useState(false);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    
    const getMicrophonePermission = async () => {
		if ("MediaRecorder" in window) {
			try {
				const mediaStream = await navigator.mediaDevices.getUserMedia({
					audio: true,
					video: false,
				});
				setPermission(true);
				setStream(mediaStream);
			} catch (err) {
				alert(err.message);
			}
		} else {
			alert("The MediaRecorder API is not supported in your browser.");
		}
	};

    const startRecording = () => {
        setRecordingStatus("recording");
        let constraints = {
            audio: true,
            video: false
        }

        audioContext = new window.AudioContext();
        console.log("sample rate: " + audioContext.sampleRate);

        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function (stream) {
                console.log("initializing Recorder.js ...");

                gumStream = stream;

                let input = audioContext.createMediaStreamSource(stream);

                recorder = new window.Recorder(input, {
                    numChannels: 1
                })

                recorder.record();
                console.log("Recording started");
            }).catch(function (err) {
                //enable the record button if getUserMedia() fails
        });

    }

    const stopRecording = () => {
        setRecordingStatus("inactive");
        console.log("stopButton clicked");

        recorder.stop(); //stop microphone access
        gumStream.getAudioTracks()[0].stop();

        recorder.exportWAV(onStop);
    }

    const onStop = (blob) => {
        console.log("uploading...");

        let data = new FormData();

        data.append('text', "this is the transcription of the audio file");
        data.append('wavfile', blob, "recording.wav");

        const config = {
            headers: {'content-type': 'multipart/form-data'}
        }
        axios.post('/api/upload', data, config);
    }

    return (
        <>		

		<div>
			<main>
				<div className="audio-controls" style={{textAlign: 'center', marginTop: '5rem' }}>
					{!permission ? (
						<img  onClick={getMicrophonePermission} style={{height: 150, }} src={disabledMic}/>
					) : null}
					{permission && recordingStatus === "inactive" ? (
						<img  onClick={startRecording} style={{height: 150, }} src={neutralMic}/>
					) : null}
					{recordingStatus === "recording" ? (
						<img  onClick={stopRecording} style={{height: 150, }} src={recordingMic}/>
					) : null}
				</div>
				
			</main>
		</div>
		</>
    );
}

export default NewRecorder;