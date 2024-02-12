import React from 'react'
import axios from '../../API/axios'


function ListenBox(params){  
    console.log(params)
    async function Deleate(){
        await axios.get('/api/admin/RemoveAudio?file_id=' + params.data.file_id)
    }
    return(
            <>
            <td>Jhon Smith</td>
            <td>{params.prompt}</td>
            <td>
            <audio src={params.data.URL} type='audio/mpeg' controls></audio> 
            </td>
            <td>
            <button onClick={Deleate}>DELEATE</button>  
            </td>
            </>    
    )
}

export default ListenBox