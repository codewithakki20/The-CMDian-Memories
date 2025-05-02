import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/authSlice';
import axios from 'axios';
import { setMessages } from '../redux/chatSlice';
import { TextField, Button, CircularProgress, Typography, Avatar } from '@mui/material';
import { MessageCircleCode } from 'lucide-react';
import Messages from '../components/Messages';

const ChatPage = () => {
  const [textMessage, setTextMessage] = useState('');
  const { user, suggestedUsers, selectedUser } = useSelector((store) => store.auth);
  const { onlineUsers, messages } = useSelector((store) => store.chat);
  const dispatch = useDispatch();

  const sendMessageHandler = async (receiverId) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/message/send/${receiverId}`,
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
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Sidebar */}
      <aside className="md:w-1/4 w-full bg-white border-r border-gray-300 p-4 overflow-y-auto">
        <Typography variant="h6" className="font-bold mb-4 text-blue-700">
          {user?.username}
        </Typography>
        <hr className="mb-4 border-gray-300" />
        {suggestedUsers.map((suggestedUser) => {
          const isOnline = onlineUsers.includes(suggestedUser?._id);
          return (
            <div
              key={suggestedUser._id}
              onClick={() => dispatch(setSelectedUser(suggestedUser))}
              className="flex gap-3 items-center p-3 rounded-md hover:bg-blue-50 transition cursor-pointer"
            >
              <Avatar
                alt={suggestedUser?.username}
                src={suggestedUser?.profilePicture}
                sx={{ width: 48, height: 48 }}
              />
              <div>
                <Typography variant="body2" className="font-medium text-gray-800">
                  {suggestedUser?.username}
                </Typography>
                <Typography
                  variant="caption"
                  className={`font-semibold ${isOnline ? 'text-green-600' : 'text-red-500'}`}
                >
                  {isOnline ? 'Online' : 'Offline'}
                </Typography>
              </div>
            </div>
          );
        })}
      </aside>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col bg-gray-50">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center gap-4 p-4 border-b border-gray-300 bg-white sticky top-0 z-10">
              <Avatar alt={selectedUser?.username} src={selectedUser?.profilePicture} />
              <Typography variant="body1" className="font-semibold text-gray-800">
                {selectedUser?.username}
              </Typography>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4">
              <Messages selectedUser={selectedUser} />
            </div>

            {/* Chat Input */}
            <div className="flex items-center gap-2 p-4 border-t border-gray-300 bg-white">
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type a message..."
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
                className="bg-white"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => sendMessageHandler(selectedUser?._id)}
                disabled={!textMessage}
                sx={{ minWidth: 100, height: '56px' }}
              >
                {textMessage ? 'Send' : <CircularProgress size={20} sx={{ color: 'white' }} />}
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1">
            <MessageCircleCode className="w-20 h-20 text-blue-500 mb-4" />
            <Typography variant="h6" className="text-gray-700 font-semibold">
              Your messages
            </Typography>
            <Typography variant="body2" className="text-gray-500">
              Select a user to start chatting.
            </Typography>
          </div>
        )}
      </main>
    </div>
  );
};

export default ChatPage;
