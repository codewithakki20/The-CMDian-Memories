import React, { useEffect, useRef } from 'react';
import { Avatar, Button, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useGetAllMessage from '../hooks/useGetAllMessage';
import useGetRTM from '../hooks/useGetRTM';

const Messages = ({ selectedUser }) => {
  const { messages = [] } = useSelector((store) => store.chat); // Default to an empty array if messages is undefined or null
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const endRef = useRef(null);

  useGetRTM();
  useGetAllMessage();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box className="flex-1 p-6 bg-gray-900 text-white rounded-xl shadow-lg overflow-y-auto">
      {/* User Profile Section */}
      <Box className="flex flex-col items-center justify-center mb-8">
        <Avatar sx={{ width: 80, height: 80 }} className="border-2 border-gray-700">
          <img
            src={selectedUser?.profilePicture}
            alt="profile"
            className="w-full h-full object-cover rounded-full"
          />
        </Avatar>
        <Typography variant="h6" className="mt-4 text-xl font-semibold text-white">
          {selectedUser?.username}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className="mt-4 px-6 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          onClick={() => navigate(`/profile/${selectedUser?._id}`)}
        >
          View Profile
        </Button>
      </Box>

      {/* Messages Section */}
      <Box className="flex flex-col gap-4">
        {messages.length > 0 ? (
          messages.map((msg) => {
            const isOwnMessage = msg.senderId === user?._id;
            return (
              <Box
                key={msg._id}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <Box
                  className={`px-5 py-3 rounded-xl max-w-[70%] text-sm shadow-md ${
                    isOwnMessage
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-none'
                      : 'bg-gray-200 text-black rounded-bl-none'
                  }`}
                >
                  {msg.message}
                </Box>
              </Box>
            );
          })
        ) : (
          <Typography variant="body2" className="text-center text-gray-400">
            No messages yet.
          </Typography>
        )}
        {/* Auto-scroll target */}
        <div ref={endRef} />
      </Box>
    </Box>
  );
};

export default Messages;
