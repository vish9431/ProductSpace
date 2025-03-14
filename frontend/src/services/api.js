import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export const fetchJobs = async (query, location = '', experience = '', source = 'all') => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/jobs`, {
      params: {
        query,
        location,
        experience,
        source
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export const fetchJobDetails = async (jobId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/job/${jobId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching job details:', error);
    throw error;
  }
};