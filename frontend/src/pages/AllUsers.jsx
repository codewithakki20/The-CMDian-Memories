import React from 'react';
import { Avatar, Typography, Link as MuiLink } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SuggestedUsers from '../components/SuggestedUsers';

const AllUsers = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="w-full max-w-md sm:max-w-lg mx-auto mt-10 px-4 sm:px-0 bg-gray-900 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <Link to={`/profile/${user?._id}`}>
          <Avatar
            src={user?.profilePicture}
            alt={user?.username}
            sx={{ width: 56, height: 56, border: '2px solid #3b82f6' }}
            className="shadow-md"
          >
            {user?.username?.[0]?.toUpperCase() || 'U'}
          </Avatar>
        </Link>
        <div>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, color: '#ffffff' }}
          >
            <MuiLink
              component={Link}
              to={`/profile/${user?._id}`}
              underline="hover"
              sx={{ color: '#ffffff', '&:hover': { color: '#3b82f6' } }}
            >
              {user?.username}
            </MuiLink>
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: '#9ca3af', fontSize: '0.875rem' }}
          >
            {user?.bio || 'No bio available.'}
          </Typography>
        </div>
      </div>

      <SuggestedUsers />
    </div>
  );
};

export default AllUsers;