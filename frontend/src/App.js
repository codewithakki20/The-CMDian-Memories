// src/App.jsx
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setOnlineUsers } from './redux/chatSlice';
import { setLikeNotification } from './redux/rtnSlice';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ChatPage from './pages/Chat';
import EditProfile from './pages/EditProfile';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Users from './pages/AllUsers';
import Gallery from './pages/Gallery';

import { connectSocket, closeSocket } from './lib/socket'; // ✅ Import new module

const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const browserRouter = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <ProtectedRoutes><Home /></ProtectedRoutes> },
      { path: '/profile/:id', element: <ProtectedRoutes><Profile /></ProtectedRoutes> },
      { path: '/account/edit', element: <ProtectedRoutes><EditProfile /></ProtectedRoutes> },
      { path: '/chat', element: <ProtectedRoutes><ChatPage /></ProtectedRoutes> },
      { path: '/users', element: <ProtectedRoutes><Users /></ProtectedRoutes> },
      { path: '/gallery', element: <ProtectedRoutes><Gallery /></ProtectedRoutes> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
    ],
  },
]);

function App() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const socket = connectSocket(user._id);

      socket.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socket.on('notification', (notification) => {
        dispatch(setLikeNotification(notification));
      });

      return () => {
        closeSocket();
      };
    } else {
      closeSocket();
    }
  }, [user, dispatch]);

  return <RouterProvider router={browserRouter} />;
}

export default App;
