import { Box, FormControl, TextField } from "@mui/material";
import React from "react";

export const Textfield = ({ setSearchValue }) => {

  const handleChange = (e) => {
    setSearchValue(e.target.value)
  };
  
  return (
    <Box mt={3} width="100%">
      <FormControl fullWidth size="small">
        <TextField
          onChange={handleChange}
          variant="outlined"
          label="Search Here..."
          type="text"
          size="medium"
        />
      </FormControl>
    </Box>
  );
};