import React, { useState, useEffect } from 'react';
import { Container, Box, CircularProgress, Alert, Typography } from '@mui/material';
import { useParams, useLocation } from 'react-router-dom';
import JobDetails from '../components/JobDetails';
import { fetchJobDetails } from '../services/api';

const JobDetailsPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [job, setJob] = useState(state?.job || null);
  const [loading, setLoading] = useState(!state?.job);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch from API if job data is not passed via state
    if (!job) {
      const getJobDetails = async () => {
        setLoading(true);
        setError(null);
        try {
          const jobData = await fetchJobDetails(id);
          setJob(jobData);
        } catch (error) {
          setError('Failed to fetch job details. Please try again later.');
          console.error('Error fetching job details:', error);
        } finally {
          setLoading(false);
        }
      };
      getJobDetails();
    }
  }, [id, job]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        ) : job ? (
          <JobDetails job={job} />
        ) : (
          <Typography variant="body1" color="text.secondary">
            Job details not available.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default JobDetailsPage;
