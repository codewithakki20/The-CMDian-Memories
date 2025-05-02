import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Button, Typography } from '@mui/material';

const SuggestedUsers = () => {
  // Accessing the suggestedUsers from the Redux store
  const { suggestedUsers } = useSelector((store) => store.auth);

  return (
    <div className="mt-10 px-4 sm:px-6 lg:px-0">
      {/* Header section */}
      <div className="flex items-center justify-between mb-4">
        <Typography variant="h6" className="text-gray-900 font-semibold text-base sm:text-lg">
          Suggested for you
        </Typography>
        <Button
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          sx={{ textTransform: 'none' }}
        >
          See All
        </Button>
      </div>

      {/* Suggested users list */}
      <div className="space-y-4">
        {suggestedUsers?.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300"
          >
            {/* User avatar and info */}
            <div className="flex items-center gap-4">
              <Link to={`/profile/${user._id}`}>
                <Avatar
                  src={user.profilePicture}
                  alt={user.username}
                  sx={{ width: 48, height: 48 }}
                  className="border-2 border-blue-500"
                />
              </Link>
              <div>
                <Typography variant="body1" className="font-semibold text-gray-800 text-sm">
                  <Link to={`/profile/${user._id}`} className="hover:underline">
                    {user.username}
                  </Link>
                </Typography>
                <Typography variant="body2" className="text-gray-600 text-xs sm:text-sm">
                  {user.bio || 'No bio available.'}
                </Typography>
              </div>
            </div>

            {/* Follow button */}
            <Button
              variant="contained"
              size="small"
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                fontWeight: 600,
                backgroundColor: '#3b82f6',
                '&:hover': { backgroundColor: '#2563eb' },
                fontSize: '0.75rem',
                padding: '4px 16px',
              }}
            >
              Follow
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedUsers;
