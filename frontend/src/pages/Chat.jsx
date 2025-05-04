import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/authSlice';
import axios from 'axios';
import { setMessages } from '../redux/chatSlice';
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Avatar,
} from '@mui/material';
import { MessageCircleCode } from 'lucide-react';
import Messages from '../components/Messages';
import server from '../api/axiosInstance';

const ChatPage = () => {
  const [textMessage, setTextMessage] = useState('');
  const { user, suggestedUsers, selectedUser } = useSelector((store) => store.auth);
  const { onlineUsers, messages } = useSelector((store) => store.chat);
  const dispatch = useDispatch();

  const sendMessageHandler = async (receiverId) => {
    try {
      const res = await axios.post(
        `${server}/api/v1/message/send/${receiverId}`,
        { textMessage },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setMessages([...messages, res.data.newMessage]));
        setTextMessage('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-gray-900">
      {/* Sidebar */}
      <aside className="md:w-1/4 w-full bg-gray-800 border-r border-gray-700 p-4 overflow-y-auto">
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#3b82f6', mb: 2 }}>
          {user?.username}
        </Typography>
        <hr className="mb-4 border-gray-600" />
        {suggestedUsers?.map((suggestedUser) => {
          const isOnline = onlineUsers?.includes(suggestedUser?._id);
          return (
            <div
              key={suggestedUser._id}
              onClick={() => dispatch(setSelectedUser(suggestedUser))}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer transition"
            >
              <Avatar
                alt={suggestedUser?.username}
                src={suggestedUser?.profilePicture}
                sx={{ width: 48, height: 48, border: '2px solid #3b82f6' }}
              />
              <div>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#ffffff' }}>
                  {suggestedUser?.username}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: isOnline ? '#22c55e' : '#ef4444', fontWeight: 500 }}
                >
                  {isOnline ? 'Online' : 'Offline'}
                </Typography>
              </div>
            </div>
          );
        })}
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-gray-900">
        {selectedUser ? (
          <>
            {/* Header */}
            <div className="flex items-center gap-4 p-4 border-b border-gray-700 bg-gray-800 sticky top-0 z-10">
              <Avatar
                alt={selectedUser?.username}
                src={selectedUser?.profilePicture}
                sx={{ width: 40, height: 40, border: '2px solid #3b82f6' }}
              />
              <Typography variant="body1" sx={{ fontWeight: 600, color: '#ffffff' }}>
                {selectedUser?.username}
              </Typography>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-2">
              <Messages selectedUser={selectedUser} />
            </div>

            {/* Chat Input */}
            <div className="flex items-center gap-3 p-4 border-t border-gray-700 bg-gray-800 sticky bottom-0 z-10">
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type a message..."
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '0.75rem',
                    backgroundColor: '#374151',
                    color: '#ffffff',
                    '& fieldset': { borderColor: '#4b5563' },
                    '&:hover fieldset': { borderColor: '#3b82f6' },
                    '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
                  },
                  '& .MuiInputBase-input': {
                    color: '#ffffff',
                    padding: '0.75rem',
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={() => sendMessageHandler(selectedUser?._id)}
                disabled={!textMessage}
                sx={{
                  borderRadius: '0.75rem',
                  backgroundColor: textMessage ? '#3b82f6' : '#4b5563',
                  '&:hover': {
                    backgroundColor: textMessage ? '#2563eb' : '#4b5563',
                  },
                  textTransform: 'none',
                  fontWeight: 600,
                  minWidth: 100,
                  height: '48px',
                }}
              >
                {textMessage ? 'Send' : <CircularProgress size={20} sx={{ color: '#ffffff' }} />}
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 p-4 text-center">
            <MessageCircleCode className="w-20 h-20 text-blue-400 mb-4" />
            <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600 }}>
              Your Messages
            </Typography>
            <Typography variant="body2" sx={{ color: '#9ca3af' }}>
              Select a user from the left to start chatting.
            </Typography>
          </div>
        )}
      </main>
    </div>
  );
};

export default ChatPage;
