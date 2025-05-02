// src/socket.js
import { io } from 'socket.io-client';

let socket = null;

export const connectSocket = (userId) => {
  socket = io('https://the-cmdian-memories.onrender.com', {
    query: { userId },
    transports: ['websocket'],
  });
  return socket;
};

export const getSocket = () => socket;

export const closeSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
