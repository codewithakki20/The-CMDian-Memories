import React from 'react';
import { Outlet } from 'react-router-dom';
import Feed from '../components/Feed';
import useGetAllPost from '../hooks/useGetAllPost';
import useGetSuggestedUsers from '../hooks/useGetSuggestedUsers';
import { Container, Typography, Button } from '@mui/material';

const Home = () => {
  useGetAllPost();
  useGetSuggestedUsers();

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-teal-500 text-white py-16 px-4 md:px-12">
        <Container maxWidth="lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Text */}
            <div className="text-center md:text-left">
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                CMDian College Memories
              </Typography>
              <Typography variant="body1" className="opacity-80 mb-6">
                Capture, share, and relive your best college moments. Join our community and preserve your academic journey forever.
              </Typography>
              <Button variant="contained" color="primary" size="large">
                Join Now
              </Button>
            </div>

            {/* Graphic */}
            <div className="flex justify-center">
              <div className="w-96 h-96 rounded-full overflow-hidden border-4 border-white/40 bg-white/20 backdrop-blur-lg">
                <img
                  src="/logo192.png"
                  alt="Memories"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* Main Feed Section - Full Width Centered */}
      <div className="w-full px-4 sm:px-8 py-12 flex justify-center">
        <div className="w-full max-w-6xl">
          <Feed />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
