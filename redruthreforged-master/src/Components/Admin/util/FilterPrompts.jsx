import { Box, MenuItem, Select, Typography } from '@mui/material'
import React, { useContext } from 'react'


function FilterPrompts(props) {
    // Styling
    const selectStyle = {
        width: '400px'
    }

    const handleChange = (e) => {
        props.setFilterOption(e.target.value)
    }

    return (
        <Box>
            <Typography>Filter by</Typography>
            <Select sx={selectStyle}
            value={props.filterOption}
            label="Set option here"
            onChange={handleChange}>
                <MenuItem value="All" sx={{color: '#666666'}}>All</MenuItem>
                {props.options.map((option) => {
                    return (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    )
                })}
            
            </Select>
        </Box>
    )
}

export default FilterPrompts