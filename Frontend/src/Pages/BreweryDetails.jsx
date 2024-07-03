import { useLocation } from "react-router-dom";
import axios from "axios";
import { Box, Paper, Typography, Link } from "@mui/material";
import { useState, useEffect } from "react";
import { decode } from 'html-entities'
import { Review } from "../Components/ReviewBox";
import { ReviewList } from "../Components/ReviewList";

export const BreweryDetails = () => {
  const location = useLocation();
  const data = location.state.state;
  const brewery_id = data.brewery.id;
  const [brewery, setBrewery] = useState({});

  useEffect(() => {
    const fetchBreweryDetails = async (brewery_id) => {
      try {
        const response = await axios(`https://api.openbrewerydb.org/v1/breweries?by_ids=${brewery_id}`);
        if (response.data && response.data.length > 0) {
          setBrewery(decode(response.data[0])); // Assuming response.data is an array of breweries
        }
      } catch (error) {
        console.error("Error fetching brewery details:", error);
      }
    };

    fetchBreweryDetails(brewery_id);
  }, [brewery_id]);

  if (!brewery) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  return (
      <Box sx={{ p: 2, maxWidth: 600, margin: "auto" }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {decode(brewery.name)}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Address:</strong> {brewery.address_1}, {brewery.city},{" "}
            {brewery.state}, {brewery.country}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Phone:</strong> {brewery.phone}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Website:</strong>{" "}
            <Link
              href={brewery.website_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {brewery.website_url}
            </Link>
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>City:</strong> {brewery.city}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>State:</strong> {brewery.state}
          </Typography>
        </Paper>
        <Review breweryId={brewery_id} />
        <ReviewList breweryId={brewery_id} />
      </Box>
  );
};
