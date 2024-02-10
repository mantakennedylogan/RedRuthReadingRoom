import React from 'react'
import { Box } from '@mui/material'
import axios from '../../API/axios'
import ListenBox from './ListenBox';

function Listen() {
  const [vis, setvis] = React.useState(false);
  const [audioURL, setAudioUrl] = React.useState(null);
  const [audioList, setAudioList] = React.useState([]);

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

  const getMutupleAudio = async() => {
    const response = await axios.get('/api/admin/getAudioFilesByPrompt');
    console.log('test');
    console.log(response.data[24].file_id);
    setAudioList(response.data)
    console.log(audioList)
    setvis(true); 
    /*
    const firstAudio = await axios.get('/api/admin/getAudioFile?file_id='+response.data[24].file_id);
    console.log(firstAudio);
    const audioBlob = new Blob([new Uint8Array(firstAudio.data.Body.data)], { type: 'audio/wav' });
    setAudioUrl(URL.createObjectURL(audioBlob));
    
  */
  
  }
    
    //



  return (

    <>
      <button onClick={getSingleAudio}> GetRecording</button>
      {(vis == true ?(
        <>
          <audio src={audioURL} type='audio/mpeg' controls></audio>
        </>
      ):null)}

      <button onClick={getMutupleAudio}> Get Mutuple</button>
      {(vis == true ?(
         
          <ListenBox audioToAdd= {audioList}></ListenBox>
        
      ):null)}
    </>
  )
}
/*
<>
          <audio src={audioURL} type='audio/mpeg' controls></audio>
          <ListenBox audioToAdd:></ListenBox>
        </>
*/
export default Listen