import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Chip, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider 
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const JobDetails = ({ job }) => {
  if (!job) return null;

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {job.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <BusinessIcon sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="h6" color="text.secondary">
            {job.company}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <Chip 
            icon={<LocationOnIcon />} 
            label={job.location} 
            variant="outlined" 
          />
          {job.experience && (
            <Chip 
              icon={<WorkIcon />} 
              label={job.experience} 
              variant="outlined" 
            />
          )}
          <Chip 
            label={job.source} 
            color={job.source === 'LinkedIn' ? 'primary' : 'secondary'}
          />
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>Job Description</Typography>
        <Typography variant="body1" paragraph>
          {job.description}
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>Requirements</Typography>
        <List>
          {job.requirements.map((requirement, index) => (
            <ListItem key={index} disableGutters>
              <ListItemIcon sx={{ minWidth: '36px' }}>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={requirement} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default JobDetails;
