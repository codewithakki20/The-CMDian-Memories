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
          width: 40,
          height: 40,
          border: '2px solid #3b82f6',
        }}
      />
      <div className="flex flex-col">
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            color: '#ffffff',
            fontSize: '0.9rem',
          }}
        >
          {author?.username || 'User'}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#d1d5db',
            fontSize: '0.85rem',
            lineHeight: 1.5,
          }}
        >
          {text}
        </Typography>
      </div>
    </div>
  );
};

export default Comment;