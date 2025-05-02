import React from 'react';
import Post from '../pages/Post';
import { useSelector } from 'react-redux';
import { Box, Grid, Paper } from '@mui/material';

const Posts = () => {
  const { posts } = useSelector((store) => store.post);

  return (
    <div className="px-4 py-6">
      {/* Container for posts */}
      <Grid container spacing={4} className="justify-center">
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post._id}>
            {/* Each post container */}
            <Paper
              elevation={3}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Post post={post} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Posts;
