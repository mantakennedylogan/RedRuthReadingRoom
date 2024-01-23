import { Box, MenuItem, Select, Typography } from '@mui/material'
import zIndex from '@mui/material/styles/zIndex'
import React from 'react'

// Builds a dropdown menu for picking options
// Accepts:
//  Name (string): Name of the menu
//  Options (array of string): Array of option names
//  currOption (number): Index of the current selected option
//  changeOptionFunc (function): Function to change selected option

function OptionPicker({name, options, currOption, changeOptionFunc, sx}) {
    const handleChange = (e) => {
        changeOptionFunc(e.target.value)
    }

    return (
        <Box sx={sx}>
            <Typography>{name}</Typography>
            <Select sx={{width: '100%', maxWidth: '400px'}}
            value={currOption}
            label="Set option here"
            onChange={handleChange}>
                {options.map((option, idx) => {
                    return (
                        <MenuItem key={idx} value={idx}>{option}</MenuItem>
                    )
                })}
            
            </Select>
        </Box>
    )
}

export default OptionPicker