import React, {Text} from 'react'
import { Box } from '@mui/material'
import axios from '../../API/axios'
import ListenBox from './ListenBox';

function Listen() {
  const [vis, setvis] = React.useState(false);
  const [audioURL, setAudioUrl] = React.useState(null)
  const [audioURLList, setAudioUrlList] = React.useState(null)

  const getSingleAudio = async() => {
    const response = await axios.get('/api/admin/getAudioFile?file_id=' + '1707549335140'); //HARD CODED
    if(response.data === ''){
      console.log(response)
      console.log('nothing In The Response')
    }
    else{
      console.log(response.data.Body.data)
      const audioBlob = new Blob([new Uint8Array(response.data.Body.data)], { type: 'audio/wav' });
      setAudioUrl(URL.createObjectURL(audioBlob));
      console.log("end");
      setvis(true); 
    } 
  }

  const getMutupleAudio = async() => {
    const prompt_id = '666' // HARD CODED FOR NOW
    console.log("a")
    const response = await axios.get('/api/admin/getListOfFiles?prompt_id=' + prompt_id);
    console.log("b")
    if(response.data === ''){
      console.log(response)
      console.log('nothing In The Response')
    }
    else{
      console.log(response) //response.data = list of objects
      let audioList = []
      for ( let i = 0; i < response.data.length; i++){
        console.log(response.data[i])
        const fileToAdd = await axios.get('/api/admin/getAudioFile?file_id=' + response.data[i].file_id);
        console.log(fileToAdd)
        const audioBlob = new Blob([new Uint8Array(fileToAdd.data.Body.data)], { type: 'audio/wav' });
        audioList = [...audioList, URL.createObjectURL(audioBlob)]
        
      }

      setAudioUrlList(audioList)
      console.log(audioURLList)
    } 
    setvis(true)
  }



  return (

    <>
      <button onClick={getSingleAudio}> GetRecording</button>
      {(vis == true ?(
        <>
          <audio src={audioURL} type='audio/mpeg' controls></audio>
        </>
      ):null)}

      <button onClick={getMutupleAudio}> GetMutuple</button>
      
      
      {(vis == true ?(
        
        audioURLList.map((individualAudio) =>{
          return(
            <ListenBox audio= {individualAudio}></ListenBox>
          
          )
        })
      ):null)}

    </>
  )
}
/*{(audioURLList != null ?(
        <Text>{audioURLList.length}</Text>
      ):null)}


      <audio src={individualAudio} type='audio/mpeg' controls></audio>

*/
export default Listen