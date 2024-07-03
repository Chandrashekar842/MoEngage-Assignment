import {
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { SelectField } from "../Components/SelectField";
import { Textfield } from "../Components/TextField";
import { useState, useEffect } from "react";
import { useAxios } from "../hooks/useAxios";
import { useNavigate, Link } from 'react-router-dom'
import { BreweryDetails } from "./BreweryDetails";


export const HomePage = () => {

  const categoryOptions = [
    { id: "city", name: "city" },
    { id: "name", name: "name" },
    { id: "type", name: "type" },
  ];

  const [category, setCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [displayList, setDisplayList] = useState([]);
  const [apiUrl, setApiUrl] = useState('https://api.openbrewerydb.org/v1/breweries');
  const [selectedBrewery, setSelectedBrewery] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    let url = 'https://api.openbrewerydb.org/v1/breweries';
    switch (category) {
        case 'name':
            url = `https://api.openbrewerydb.org/v1/breweries?by_name=${searchValue}`;
            break;
        case 'city':
            url = `https://api.openbrewerydb.org/v1/breweries?by_city=${searchValue}`;
            break;
        case 'type':
            url = `https://api.openbrewerydb.org/v1/breweries?by_type=${searchValue}`;
            break;
        default:
            break;
    }
    setApiUrl(url);
}, [category, searchValue]);

const { response, loading, error } = useAxios({ url: apiUrl });

useEffect(() => {
    if (!loading && response) {
        let list = response.data;

        list = list.sort((a, b) => {
            const aStartsWithSearch = a.name.toLowerCase().startsWith(searchValue.toLowerCase());
            const bStartsWithSearch = b.name.toLowerCase().startsWith(searchValue.toLowerCase());
            
            if (aStartsWithSearch && !bStartsWithSearch) return -1;
            if (!aStartsWithSearch && bStartsWithSearch) return 1;
            return 0;
        });

        const updatedList = list?.map((listItem) => ({
            id: listItem.id,
            name: listItem.name,
            city: listItem.city
        }));
        setDisplayList(updatedList);
    }
}, [response, loading]);

const handleNavigate = (brewery) => {
    setSelectedBrewery(brewery)
};

  return (
    <Box sx={{ p: 1, maxWidth: 600, margin: "auto" }}>
      <Typography variant="h3" fontWeight="bold">
        Brewery Search
      </Typography>
      <SelectField
        options={categoryOptions}
        label="Search By"
        setCategory={setCategory}
      />
      <Textfield setSearchValue={setSearchValue} />
      <Paper sx={{ mt: 2, maxHeight: 400, overflow: "auto" }}>
        <List>
          {displayList?.map((brewery) => (
            <ListItem 
                sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)'}}} 
                key={brewery.id} 
                divider 
                onClick={() => handleNavigate(brewery)}
            >
                <Link to='/details' state={{ state: {brewery}}} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemText primary={brewery.name} secondary={brewery.city} />
                </Link>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};
