import React from 'react';
import { Avatar, Typography } from '@mui/material';

const Comment = ({ comment }) => {
  const { author, text } = comment || {};

  return (
    <div className="flex items-start gap-3 py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 w-full">
      <Avatar
        alt={author?.username || 'User'}
        src={author?.profilePicture || ''}
        sx={{ width: 36, height: 36 }}
      />
      <div>
        <Typography variant="body2" className="text-sm text-gray-900 dark:text-gray-100">
          <span className="font-semibold">{author?.username}</span>
          <span className="ml-2 text-gray-700 dark:text-gray-400">{text}</span>
        </Typography>
      </div>
    </div>
  );
};

export default Comment;
