import { useState, useRef, useEffect} from "react";
/*import AWS from 'aws-sdk'
import ReactS3 from 'react-s3';

import { ConfigurationServicePlaceholders } from "aws-sdk/lib/config_service_placeholders";
*/

import disabledMic from "../../../images/disabledMic.png";
import neutralMic from "../../../images/neutralMic.png";
import recordingMic from "../../../images/recordingMic.png";
import axios from '../../../API/axios';
const mimeType = "audio/webm";

const AudioRecorder = () => {
	const [permission, setPermission] = useState(false);
	const mediaRecorder = useRef(null);
	const [recordingStatus, setRecordingStatus] = useState("inactive");
	const [stream, setStream] = useState(null);
	const [audio, setAudio] = useState(null);
	const [audioChunks, setAudioChunks] = useState([]);

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

	const startRecording = async () => {
		setRecordingStatus("recording");
		const media = new MediaRecorder(stream, { type: 'audio/wav' });

		mediaRecorder.current = media;

		mediaRecorder.current.start();

		let localAudioChunks = [];

		mediaRecorder.current.ondataavailable = (event) => {
			if (typeof event.data === "undefined") return;
			if (event.data.size === 0) return;
			localAudioChunks.push(event.data);
		};

		setAudioChunks(localAudioChunks);
	};

	const stopRecording = () => {
		setRecordingStatus("inactive");
		mediaRecorder.current.stop();

		mediaRecorder.current.onstop = () => {
			const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
			const audioUrl = URL.createObjectURL(audioBlob);

			setAudio(audioBlob);

			setAudioChunks([]);
		};
	};


	const uploadAudio = async () => {
		try {
		  const formData = new FormData();
		  formData.append('audio', audio, 'submission.wav');
		  //
		  console.log(audio);
	
		  const response = await axios.post('/api/upload', formData, {
			headers: {
			  'Content-Type': 'multipart/form-data'
			}
		  });

		  //
	
		  console.log('File uploaded successfully:', response.data);
		} catch (error) {
		  console.error('Error uploading file:', error);
		}
	};

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
				{audio ? (
					<div className="audio-player" style={{textAlign: 'center', marginTop: '3rem' }}>
						<audio src={audio} controls></audio>
						<br></br>
						<a download href={audio} style={{color: '#323f54', textDecoration: 'none', fontSize: 12}}>
							Download Recording
						</a>
						<br></br>
        				<button onClick={uploadAudio} style={{marginTop: '3rem', background:'#323f54', color: '#faf9f6', fontSize: 20, borderRadius: 5, padding: 10, paddingLeft:20, paddingRight:20 }}>SUBMIT</button>	
					</div>
				) : null}
			</main>
		</div>
		</>
	);
};

export default AudioRecorder;