import React from 'react'

function ListenBox(params){  
    console.log(params)
    return(
        <audio src={params.audio} type='audio/mpeg' controls></audio>   
        
    )
}

export default ListenBox