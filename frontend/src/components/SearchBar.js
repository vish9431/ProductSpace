import React, { useState } from 'react';
import { Paper, TextField, Button, Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query, location);
  };

  return (
    <Paper 
      component="form" 
      onSubmit={handleSearch}
      sx={{ 
        p: 3, 
        my: 3, 
        borderRadius: 2,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            label="Job Title"
            placeholder="e.g. Product Manager"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            label="Location"
            placeholder="e.g. Bangalore, Mumbai"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button 
            fullWidth 
            variant="contained" 
            type="submit" 
            startIcon={<SearchIcon />}
            sx={{ height: '56px' }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SearchBar;