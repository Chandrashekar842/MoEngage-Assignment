import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useState } from 'react'

export const SelectField = (props) => {
    const { options, label, setCategory } = props
    const [ selectedValue, setSelectedValue ] = useState("") 

    const handleChange = (e) => {
        setSelectedValue(e.target.value)
        setCategory(e.target.value)
    }

    return (
        <Box mt={3} width='100%'>
            <FormControl fullWidth size='medium'>
                <InputLabel>{label}</InputLabel>
                <Select label={label} value={selectedValue} onChange={handleChange}>
                    {options.map(({id, name}) => (
                        <MenuItem value={id} key={id}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )

}