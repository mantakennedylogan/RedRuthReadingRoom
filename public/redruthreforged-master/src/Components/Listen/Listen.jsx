import React  from 'react'
import { Box } from '@mui/material'
import axios from '../../API/axios'
import ListenBox from './ListenBox';

function Listen() {
  const [vis, setvis] = React.useState(false);
  const [audioURL, setAudioUrl] = React.useState(null)
  const [audioURLList, setAudioUrlList] = React.useState(null)
  const [waitingText, setwaitingText] = React.useState("")
  const [promptName, setPromptName] = React.useState("")
console.log(waitingText)
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
    setwaitingText('Please wait while we get your data')
    const prompt_id = '666' // HARD CODED FOR NOW
    const pname = await axios.get('/api/admin/getPromptName?prompt_id=' + prompt_id)
    console.log(pname.data[0].prompt)
    setPromptName(pname.data[0].prompt)
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
        audioList = [...audioList, {URL: URL.createObjectURL(audioBlob), file_id: response.data[i].file_id}]
        
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
        <li>
          <audio src={audioURL} type='audio/mpeg' controls></audio>
        </li>
      ):null)}

      <button onClick={getMutupleAudio}> GetMutuple</button>
      
      <div style={{paddingLeft: 30}}>
      {vis == true &&
        <table style = {{backgroundColor : 'white'}}>
        <tr>
          <td>Name</td>
          <td>prompt</td>
          <td>Recording</td>
          <td>Deleate</td>
        </tr>
        {
        audioURLList.map((individualAudio) =>{
          return(
            <tr style = {{backgroundColor : 'white',
            borderColor: 'black',
            borderWidth: 100}}>
            <ListenBox data = {individualAudio} prompt = {promptName}></ListenBox>
            </tr>
          
          )
          
        })}
        
        </table>
      }{
      vis == false && <text>{waitingText}</text>
    }
    </div>
    </>
  )
}
/*{(audioURLList != null ?(
        <Text>{audioURLList.length}</Text>
      ):null)}



      <audio src={individualAudio} type='audio/mpeg' controls></audio>

*/
export default Listen