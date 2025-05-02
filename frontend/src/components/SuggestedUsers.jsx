import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Button, Typography } from '@mui/material';

const SuggestedUsers = () => {
  // Accessing the suggestedUsers from the Redux store
  const { suggestedUsers } = useSelector((store) => store.auth);

  return (
    <div className="mt-12 px-4 sm:px-6 lg:px-0 bg-gray-900">
      {/* Header section */}
      <div className="flex items-center justify-between mb-6">
        <Typography
          variant="h6"
          sx={{ color: '#ffffff', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.125rem' } }}
        >
          Suggested for you
        </Typography>
        <Button
          sx={{
            color: '#3b82f6',
            fontWeight: 500,
            textTransform: 'none',
            fontSize: '0.875rem',
            '&:hover': { color: '#2563eb' },
          }}
        >
          See All
        </Button>
      </div>

      {/* Suggested users list */}
      <div className="space-y-4">
        {suggestedUsers?.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between bg-gray-800 px-4 py-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* User avatar and info */}
            <div className="flex items-center gap-4">
              <Link to={`/profile/${user._id}`}>
                <Avatar
                  src={user.profilePicture}
                  alt={user.username}
                  sx={{ width: 52, height: 52, border: '2px solid #3b82f6' }}
                />
              </Link>
              <div>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, color: '#ffffff', fontSize: '0.875rem' }}
                >
                  <Link to={`/profile/${user._id}`} className="hover:underline">
                    {user.username}
                  </Link>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#9ca3af', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                >
                  {user.bio || 'No bio available.'}
                </Typography>
              </div>
            </div>

            {/* Follow button */}
            <Button
              variant="contained"
              size="small"
              sx={{
                borderRadius: '9999px',
                textTransform: 'none',
                fontWeight: 600,
                backgroundColor: '#3b82f6',
                '&:hover': { backgroundColor: '#2563eb' },
                fontSize: '0.75rem',
                px: 3,
                py: 0.5,
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