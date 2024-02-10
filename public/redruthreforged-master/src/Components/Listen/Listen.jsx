import React from 'react'
import { Box } from '@mui/material'
import axios from '../../API/axios'
import AudioPlayer from 'react-h5-audio-player'

function Listen() {
  const [vis, setvis] = React.useState(false);
  const [audioURL, setAudioUrl] = React.useState(null)

  const getSingleAudio = async() => {
    const response = await axios.get('/api/admin/getAudioFile');
    if(response.data === ''){
      console.log(response)
      console.log('nothing In The Response')
    }
    else{
      const audioBlob = new Blob([new Uint8Array(response.data.Body.data)], { type: 'audio/wav' });
      setAudioUrl(URL.createObjectURL(audioBlob));
      console.log("end");
      setvis(true); 
    } 
  }



  return (

    <>
      <button onClick={getSingleAudio}> GetRecording</button>
      {(vis == true ?(
        <>
          <audio src={audioURL} type='audio/mpeg' controls></audio>
        </>
      ):null)}

    </>
  )
}
/*

*/
export default Listen