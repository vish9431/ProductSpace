import React from 'react';
import { Card, CardContent, Typography, Button, Box, Chip, CardActions, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';

const JobCard = ({ job }) => {
    return (
        <Card sx={{
            mb: 2,
            border: '1px solid #eee',
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transform: 'translateY(-2px)',
                transition: 'all 0.2s ease-in-out'
            }
        }}>
            <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                    {job.title}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    <Chip
                        size="small"
                        label={job.source}
                        color={job.source === 'LinkedIn' ? 'primary' : 'secondary'}
                        sx={{ borderRadius: 1 }}
                    />
                </Stack>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <BusinessIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                        {job.company}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOnIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                        {job.location}
                    </Typography>
                </Box>

                {job.experience && job.experience !== 'Not specified' && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <WorkIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                            {job.experience}
                        </Typography>
                    </Box>
                )}
            </CardContent>

            <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Button
                    component="a"
                    href={`/job/${job.id}`}
                    target="_blank"
                    state={{ job }}
                    rel="noopener noreferrer"
                    size="small"
                    variant="outlined"
                >
                    View Details
                </Button>
                <Button
                    href={job.application_link}
                    target="_blank"
                    size="small"
                    variant="contained"
                    color="primary"
                >
                    Apply
                </Button>
            </CardActions>
        </Card>
    );
};

export default JobCard;