import { useState, useRef, useEffect} from "react";
/*import AWS from 'aws-sdk'
import ReactS3 from 'react-s3';

import { ConfigurationServicePlaceholders } from "aws-sdk/lib/config_service_placeholders";
*/

import disabledMic from "../../../images/disabledMic.png";
import neutralMic from "../../../images/neutralMic.png";
import recordingMic from "../../../images/recordingMic.png";
import axios from '../../../API/axios';
import React from 'react';
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
		const media = new MediaRecorder(stream, { type: mimeType });

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
			const audioBlob = new Blob(audioChunks, { type: mimeType });
			const audioUrl = URL.createObjectURL(audioBlob);

			setAudio(audioUrl);

			setAudioChunks([]);
		};
		
	};

	// Function to upload file to s3
	// const uploadFile = async () => {
	// 	// S3 Bucket Name
	// 	const S3_BUCKET = "redruth-bucket";
	
	// 	// S3 Region
	// 	const REGION = "us-west-2";
	
	// 	// S3 Credentials
	// 	AWS.config.update({
	// 	  accessKeyId: "AKIA2WTBG4K3GELKESGS",
	// 	  secretAccessKey: "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",
	// 	});
	// 	const s3 = new AWS.S3({
	// 	  params: { Bucket: S3_BUCKET },
	// 	  region: REGION,
	// 	});

	// 	// Files Parameters

	// 	const params = {
	// 		Bucket: S3_BUCKET,
	// 		Key: "Se7en audio name",
	// 		Body: audio,
	// 	  };
	  
	// 	  // Uploading file to s3
	  
	// 	  var upload = s3
	// 		.putObject(params)
	// 		.on("httpUploadProgress", (evt) => {
	// 		  // File uploading progress
	// 		  console.log(
	// 			"Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
	// 		  );
	// 		})
	// 		.promise();
	  
	// 	  await upload.then((err, data) => {
	// 		console.log(err);
	// 		// Fille successfully uploaded
	// 		alert("audio uploaded successfully.");
	// 	  });
	// };

	const config = {
		bucketName: 'redruth-bucket',
		region: 'us-west-2',
		accessKeyId: 'AKIA2WTBG4K3GELKESGS',
		secretAccessKey: 'LQNAcBUrON8jOshkRoYrAROnkhWbQgX4zuoSgL2Y+DEkgDxe6veFosBT7eUgEXAMPLE',
	}
/*
	function uploadFile(audio) {
		ReactS3.upload(audio, config)
		.then(data => console.log(data))
		.catch(err => console.error(err))	
	}
	*/
	//Upload audio file to the server (ORIGINAL)
	function uploadFile(/*john*/){

		try{
			axios.post('/api/upload', {'audio':audio}).then((response)=>{
				console.log(response);
			});
			console.log("sent file");
		}
		catch (e) {
			console.log("Axios fail :(");
		}
		console.log("end of upload file");
	}


	//TESTING

	// const uploadFile = (thisAudio) => {
	// 	try{
	// 		let formData = new FormData();
	// 		formData.append("audioFile", thisAudio, "recording.wav");
	// 		const config = {
	// 			headers: {'content-type': 'multipart/form-data'}
	// 		}
	// 		axios.post("/api/upload", formData, config);
	// 		// axios.post("/api/upload", formData).then((response) => {
	// 		// 	console.log(response.status, response.data.token);
	// 		// });
	// 	}
	// 	catch (e) {
	// 		console.log("upload fail!");
	// 	}	
	// }

	// useEffect((result) => {
	// 	var inputElement = document.createElement('input');
	// 	inputElement.type = "button"
	// 	inputElement.name = "button"
		
	// 	inputElement.addEventListener('click', function(){
	// 		uploadFile(result.name);
	// 	});
	// 	//document.body.appendChild(inputElement);
	// });

	// invoke = (event) => {
	// 	let nameOfFunction = this[event.target.name];
	// 	let arg1 = event.target.getAttribute('data-arg1');
	// 	// We can add more arguments as needed...
	// 	window[nameOfFunction](arg1)
	// 	// Hope the function is in the window.
	// 	// Else the respective object need to be used
	// 	}
	//   };

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
        				<button onClick={uploadFile/*(audio)*/} style={{marginTop: '3rem', background:'#323f54', color: '#faf9f6', fontSize: 20, borderRadius: 5, padding: 10, paddingLeft:20, paddingRight:20 }}>SUBMIT</button>
					</div>
				) : null}
			</main>
		</div>
		</>
	);
};

export default AudioRecorder;