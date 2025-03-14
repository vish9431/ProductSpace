import React from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import JobCard from './JobCard';

const JobList = ({ jobs, loading, error }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="body1">
          No jobs found. Try adjusting your search criteria.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {jobs.length} jobs found
      </Typography>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </Box>
  );
};

export default JobList;