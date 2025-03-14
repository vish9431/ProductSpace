import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, Alert } from '@mui/material';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import JobList from '../components/JobList';
import { fetchJobs } from '../services/api';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    query: '',
    location: '',
    source: 'all',
    experience: ''
  });

  const handleSearch = (query, location) => {
    setFilters({
      ...filters,
      query,
      location
    });
  };

  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value
    });
  };

  useEffect(() => {
    const getJobs = async () => {
      // Only fetch if we have a query
      if (!filters.query) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetchJobs(
          filters.query, 
          filters.location, 
          filters.experience, 
          filters.source
        );
        setJobs(response);
      } catch (error) {
        setError('Failed to fetch jobs. Please try again later.');
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    getJobs();
  }, [filters]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Find Your Dream Job
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Search through thousands of job postings from various sources
        </Typography>
      </Box>
      
      <SearchBar onSearch={handleSearch} />
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Filters onFilterChange={handleFilterChange} />
        </Grid>
        <Grid item xs={12} md={9}>
          {!filters.query && !loading ? (
            <Alert severity="info" sx={{ mb: 2 }}>
              Enter a job title to start searching
            </Alert>
          ) : (
            <JobList jobs={jobs} loading={loading} error={error} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;