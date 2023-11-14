import { useState, useRef } from "react";
import AWS from 'aws-sdk';

import ReactS3 from 'react-s3';

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

	function uploadFile(audio) {
		ReactS3.upload(audio, config)
		.then(data => console.log(data))
		.catch(err => console.error(err))	
	}

	return (
		<>

		<script src="https://sdk.amazonaws.com/js/aws-sdk-2.1491.0.min.js"></script>

		

		<div>
			<h2>Audio Recorder</h2>
			<main>
				<div className="audio-controls">
					{!permission ? (
						<button onClick={getMicrophonePermission} type="button">
							Get Microphone
						</button>
					) : null}
					{permission && recordingStatus === "inactive" ? (
						<button onClick={startRecording} type="button">
							Start Recording
						</button>
					) : null}
					{recordingStatus === "recording" ? (
						<button onClick={stopRecording} type="button">
							Stop Recording
						</button>
					) : null}
				</div>
				{audio ? (
					<div className="audio-player">
						<audio src={audio} controls></audio>
						<a download href={audio}>
							Download Recording
						</a>

        				<button onClick={uploadFile(audio)}>Upload</button>
					</div>
				) : null}
			</main>
		</div>
		</>
	);
};

export default AudioRecorder;