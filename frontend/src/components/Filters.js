import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  FormControl, 
  FormLabel, 
  FormControlLabel, 
  Radio, 
  RadioGroup,
  Divider 
} from '@mui/material';

const Filters = ({ onFilterChange }) => {
  const handleSourceChange = (e) => {
    onFilterChange('source', e.target.value);
  };

  const handleExperienceChange = (e) => {
    onFilterChange('experience', e.target.value);
  };

  return (
    <Paper sx={{ p: 2, height: 'fit-content' }}>
      <Typography variant="h6" gutterBottom>Filters</Typography>
      
      <Box sx={{ mb: 3 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Source</FormLabel>
          <RadioGroup 
            defaultValue="all"
            onChange={handleSourceChange}
          >
            <FormControlLabel value="all" control={<Radio />} label="All Sources" />
            <FormControlLabel value="linkedin" control={<Radio />} label="LinkedIn" />
            <FormControlLabel value="naukri" control={<Radio />} label="Naukri" />
          </RadioGroup>
        </FormControl>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Box>
        <FormControl component="fieldset">
          <FormLabel component="legend">Experience</FormLabel>
          <RadioGroup 
            defaultValue=""
            onChange={handleExperienceChange}
          >
            <FormControlLabel value="" control={<Radio />} label="All Experience" />
            <FormControlLabel value="0-1" control={<Radio />} label="0-1 years" />
            <FormControlLabel value="1-3" control={<Radio />} label="1-3 years" />
            <FormControlLabel value="3-5" control={<Radio />} label="3-5 years" />
            <FormControlLabel value="5-10" control={<Radio />} label="5-10 years" />
            <FormControlLabel value="10+" control={<Radio />} label="10+ years" />
          </RadioGroup>
        </FormControl>
      </Box>
    </Paper>
  );
};

export default Filters;