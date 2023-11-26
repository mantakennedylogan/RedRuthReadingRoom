import React from 'react'
import { Link } from 'react-router-dom'
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import img from '../../images/intro.png';

function Home() {

    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: '50px'}}>
                <Typography level="h1" fontWeight={'fontWeightLight'} fontSize={40}>Unlock Voices, Ignite Insights:</Typography>
                <Typography fontWeight="fontWeightBold" fontSize={80} sx={{lineHeight: "85px"}}>Redruth <br></br> Reading Room</Typography>
                <Typography fontSize={25} fontWeight={'fontWeightLight'}>Your gateway to effortless audio gathering for <br></br>
                    research, museums, and organizations. Start your <br></br>
                    journey with Redruth Reading Room today!</Typography>
            </Box>

            <Box sx={{display: 'flex', height: 782}}> 
                <img src={img} alt="Logo" />
            </Box>
        </Box>
    )
}

export default Home