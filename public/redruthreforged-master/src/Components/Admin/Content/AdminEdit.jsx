import React, { useEffect }  from 'react'
import { Box } from '@mui/material'
import axios from '../../../API/axios'
import ListenBox from '../../Listen/ListenBox';

function AdminEdit() {

    const [vis, setvis] = React.useState(false);
    const [audioURLList, setAudioUrlList] = React.useState(null)
    const [waitingText, setwaitingText] = React.useState("")
    const [collectionName, setCollectionName] = React.useState("")
    const [listOfUserCollections, setlistOfUserCollections] = React.useState([])
    const [listOfPrompts, setListOfPrompts] = React.useState([])
    const [promptName, setPromptName]= React.useState(null)

    
    const getColections = async() =>{
      let bob = await axios.get('/api/admin/getusercollections?user_id=12345')
      setlistOfUserCollections(bob.data)
    }

    const getPrompts = async(collName) =>{
      let collectionID = await axios.get('/api/admin/getCollectionId?collection_name='+collName)
      let promptNames = await axios.get('/api/admin/promptByCollection?collection_id='+collectionID.data[0].collection_id)
      setListOfPrompts(promptNames.data)
      setPromptName(promptNames.data[0].prompt)
    } 

    const getMutupleAudio = async() => {
      setwaitingText('Please wait while we get your data')
      setvis(false)
      if(promptName == null){
        setwaitingText("No Prompt Name is selected")
        return
      }
      const prompt_id = await axios.get('/api/admin/getPromptId?prompt_name=' + promptName);
      //const prompt_id = '666' // HARD CODED FOR NOW
      //const pname = await axios.get('/api/admin/getPromptName?prompt_id=' + prompt_id)
      //console.log(pname.data[0].prompt)
      //setPromptName(pname.data[0].prompt)
      const response = await axios.get('/api/admin/getListOfFiles?prompt_id=' + prompt_id.data[0].prompt_id);
      if(response.data === ''){
        console.log('nothing In The Response This should never hapen')
      }
      else{
        let audioList = []
        for ( let i = 0; i < response.data.length; i++){
          const fileToAdd = await axios.get('/api/admin/getAudioFile?file_id=' + response.data[i].file_id);
          const audioBlob = new Blob([new Uint8Array(fileToAdd.data.Body.data)], { type: 'audio/wav' });
          audioList = [...audioList, {URL: URL.createObjectURL(audioBlob), file_id: response.data[i].file_id, name: response.data[i].name}]
          
        }
  
        setAudioUrlList(audioList)
      } 
      setvis(true)
    }
  
  useEffect(() =>{
    getColections()
  },[])

  async function handelCollectionChange(e){
    setCollectionName(e.target.value);
    getPrompts(e.target.value)
    setPromptName(null)


  }
  async function handelPromptChange(e){
    setPromptName(e.target.value)
  }
  //<button onClick={getPrompts}>get prompts</button>
       
    return (
  
      <>

        <table>
          <tr>
            <td>Collection</td>
            <td>Prompt</td>
            
          </tr>
          <tr>
            <td>
        <select onChange={ handelCollectionChange}>
          {
          listOfUserCollections.map((collectoins) =>{
            
            return(
            <option value={collectoins.title}>{collectoins.title}</option>
            )
          })
        }
        </select></td>
        <td>
        {listOfPrompts != null && 
        <select onChange={ handelPromptChange }>
          {
          listOfPrompts.map((prompts) =>{
            
            return(
            <option value={prompts.prompt}>{prompts.prompt}</option>
            )
          })
        }
        
        </select>
        }
        </td>
        <button onClick={getMutupleAudio}> Get Audios</button>
        </tr>
        </table>
        
        
        <div style={{paddingLeft: 30}}>
        {vis == true && audioURLList.length == 0 && waitingText == 'Please wait while we get your data' &&
        <text> There are no audios in this prompt</text> }
        {vis == true && audioURLList.length != 0 &&
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
export default AdminEdit