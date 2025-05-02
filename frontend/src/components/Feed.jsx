import React from 'react';
import Posts from './Posts';
import { Typography, Box } from '@mui/material';

const Feed = () => {
  return (
    <Box className="w-full max-w-7xl mx-auto bg-gray-800 shadow-xl rounded-2xl p-6">
      <Box className="text-center mb-8">
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: '#ffffff' }}
        >
          CMDians' Best Moments
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: '#9ca3af', mt: 1 }}
        >
          Browse the latest updates from our community.
        </Typography>
      </Box>
      <Posts />
    </Box>
  );
};

export default Feed;