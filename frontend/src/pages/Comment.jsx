import React from 'react';
import { Avatar, Typography } from '@mui/material';

const Comment = ({ comment }) => {
  const { author, text } = comment || {};

  return (
    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-700/50 transition-colors duration-200 w-full">
      <Avatar
        alt={author?.username || 'User'}
        src={author?.profilePicture || ''}
        sx={{
          width: { xs: 32, sm: 40 }, // Responsive width for avatar
          height: { xs: 32, sm: 40 }, // Responsive height for avatar
          border: '2px solid #3b82f6',
        }}
      />
      <div className="flex flex-col w-full">
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            color: '#ffffff',
            fontSize: { xs: '0.875rem', sm: '0.9rem' }, // Adjust font size for small devices
            overflowWrap: 'break-word',
          }}
        >
          {author?.username || 'User'}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#d1d5db',
            fontSize: { xs: '0.75rem', sm: '0.85rem' }, // Adjust font size for small devices
            lineHeight: 1.5,
            wordBreak: 'break-word', // Ensure text doesn't overflow
          }}
        >
          {text}
        </Typography>
      </div>
    </div>
  );
};

export default Comment;
