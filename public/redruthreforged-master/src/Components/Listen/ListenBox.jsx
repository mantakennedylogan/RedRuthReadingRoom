import React from 'react'

function ListenBox(params){
    //const [audioURL, setAudioUrl] = React.useState(null)
    const [audioURLList, setaudioURLList] = React.useState([])
    console.log("as")
    console.log(params.audioToAdd)
    params.audioToAdd.map((audio) =>{
        const audioBlob = new Blob([new Uint8Array(audio)], { type: 'audio/wav' });
        console.log(audioURLList)
        console.log("sdfsdfsdf\n")
        setaudioURLList([...audioURLList, URL.createObjectURL(audioBlob)]);
    }
    )
        

    return(
        
        audioURLList.map((audio) =>
            <audio src={audio} type='audio/mpeg' controls></audio>
        )
        
    )
}

export default ListenBox