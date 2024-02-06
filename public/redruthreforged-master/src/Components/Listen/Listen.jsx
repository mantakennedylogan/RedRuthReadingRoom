import React from 'react'
import { Box } from '@mui/material'
import axios from '../../API/axios'

function Listen() {


  const getAudio = async() => {
    let response = '';
    await axios.get('/api/admin/getAudioFile').then((response) =>{
      if(response.data === ''){
        console.log('nothing')
      }
      else{
        console.log(response)
      }
    });


    
    
  }



  return (

    <Box>
      <button onClick={getAudio}> BIG BUTTON</button>
      
    </Box>
  )
}

export default Listen