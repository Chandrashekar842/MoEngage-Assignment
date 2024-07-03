import { Box, Rating, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import api from "../api";

export const Review = ({ breweryId }) => {
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    const data = {
      rating: value,
      description: description,
      breweryId: breweryId
    }
    try {
      const response = await api.post('/review/add-review', data)
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography 
        sx={{p:1}}
      >
        Submit Your Review:
      </Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <TextField
        label="Review"
        multiline
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleSubmit} variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};
