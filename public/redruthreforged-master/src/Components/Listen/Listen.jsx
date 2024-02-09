import React from 'react'
import { Box } from '@mui/material'
import axios from '../../API/axios'

function Listen() {
	const [audioMime, setAudioMime] = React.useState(null);
  const [vis, setvis] = React.useState(false);

  const getAudio = async() => {
    let response = '';
    console.log('th\n\n\n')
    await axios.get('/api/admin/getAudioFile').then((response) =>{
      console.log('in\n\n\n\n')
      if(response.data === ''){
        console.log(response)
        console.log('nothing')
      }
      else{
        console.log('nothing\n\n\n\n')
        console.log(response.data.Body.data)
        const audioMime = new Blob(response.data.Body.data, { type: 'mimeType' });
        const audioUrl = URL.createObjectURL(audioMime);
        
			  setAudioMime(audioUrl);

        console.log(audioMime)
        console.log("end");
        
        setvis(true);
      }
    });


    
    
  }



  return (

    <Box>
      <button onClick={getAudio}> BIG BUTTON</button>
      {(vis == true ?(<audio src={audioMime} controls></audio>):null)}
      
    
    </Box>
  )
}

export default Listen