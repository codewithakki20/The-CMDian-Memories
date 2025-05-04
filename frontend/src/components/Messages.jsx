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
    <Box
      className="flex-1 p-4 sm:p-6 bg-gray-800 rounded-t-2xl sm:rounded-2xl shadow-xl overflow-y-auto"
    >
      {/* User Profile Section */}
      <Box className="flex flex-col items-center justify-center mb-6 sm:mb-10">
        <Avatar
          sx={{ width: 80, height: 80, border: '3px solid #3b82f6' }}
          className="shadow-lg"
        >
          <img
            src={selectedUser?.profilePicture}
            alt="profile"
            className="w-full h-full object-cover rounded-full"
          />
        </Avatar>
        <Typography
          variant="h6"
          sx={{
            mt: 2,
            color: '#ffffff',
            fontWeight: 600,
            fontSize: { xs: '1rem', sm: '1.25rem' },
          }}
        >
          {selectedUser?.username}
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            borderRadius: '0.75rem',
            backgroundColor: '#3b82f6',
            '&:hover': { backgroundColor: '#2563eb' },
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            py: 1,
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
          }}
          onClick={() => navigate(`/profile/${selectedUser?._id}`)}
        >
          View Profile
        </Button>
      </Box>

      {/* Messages Section */}
      <Box className="flex flex-col gap-3 sm:gap-4">
        {messages.length > 0 ? (
          messages.map((msg) => {
            const isOwnMessage = msg.senderId === user?._id;
            return (
              <Box
                key={msg._id}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <Box
                  className={`px-4 py-2 rounded-xl max-w-[85%] sm:max-w-[70%] text-sm shadow-md ${
                    isOwnMessage
                      ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-br-none'
                      : 'bg-gray-700 text-gray-100 rounded-bl-none'
                  }`}
                >
                  {msg.message}
                </Box>
              </Box>
            );
          })
        ) : (
          <Typography
            variant="body2"
            sx={{ textAlign: 'center', color: '#9ca3af' }}
          >
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
