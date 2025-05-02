import React from 'react';
import Posts from './Posts';

const Feed = () => {
  return (
    <div className="w-full max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">CMDians' Best Moments</h2>
        <p className="text-gray-500 mt-1">Browse the latest updates from our community.</p>
      </div>
      <Posts />
    </div>
  );
};

export default Feed;
