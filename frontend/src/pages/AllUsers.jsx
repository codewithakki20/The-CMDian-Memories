import React from 'react';
import { Avatar, Typography, Link as MuiLink } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SuggestedUsers from '../components/SuggestedUsers';

const AllUsers = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="w-full max-w-md sm:max-w-lg mx-auto mt-8 px-4 sm:px-0">
      <div className="flex items-center gap-4 mb-6">
        <Link to={`/profile/${user?._id}`}>
          <Avatar
            src={user?.profilePicture}
            alt={user?.username}
            sx={{ width: 50, height: 50 }}
          >
            {user?.username?.[0]?.toUpperCase() || 'U'}
          </Avatar>
        </Link>
        <div>
          <Typography variant="subtitle1" className="text-gray-800 font-semibold">
            <MuiLink
              component={Link}
              to={`/profile/${user?._id}`}
              underline="hover"
              color="inherit"
            >
              {user?.username}
            </MuiLink>
          </Typography>
          <Typography variant="body2" className="text-gray-500 text-sm">
            {user?.bio || 'No bio available.'}
          </Typography>
        </div>
      </div>

      <SuggestedUsers />
    </div>
  );
};

export default AllUsers;
