import React from 'react';
import Posts from './Posts';
import { Typography, Box } from '@mui/material';

const Feed = () => {
  return (
    <>
      <Box className="text-center mb-8">
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: '#ffffff' }}
        >
          CMDians' Best Moments
        </Typography>
      </Box>
      <Posts />
    </>
  );
};

export default Feed;
