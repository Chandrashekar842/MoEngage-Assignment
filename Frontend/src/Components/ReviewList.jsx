import {
  Box,
  List,
  ListItem,
  ListItemText,
  Rating,
  Typography,
} from "@mui/material";
import api from "../api";
import { useState, useEffect } from "react";

export const ReviewList = ({ breweryId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await api.get(
        `http://localhost:3001/review/get-reviews/${breweryId}`
      );
      if (response) {
        setReviews(response.data.reviews);
      }
    };
    fetchReviews();
  }, [breweryId]);

  return (
    <Box>
      <Typography variant="h6">Reviews</Typography>
      <List>
        {reviews.map((review, index) => (
          <ListItem key={index} alignItems="flex-start" divider>
            <ListItemText
              primary={
                <>
                  <Typography variant="subtitle1">{review.username}</Typography>
                  <Rating value={review.rating} readOnly />
                </>
              }
              secondary={review.description}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
