import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  CircularProgress,
  Paper,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setAuthUser } from '../redux/authSlice';
import { toast } from 'sonner';
import server from '../api/axiosInstance';

const Login = () => {
  const [input, setInput] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${server}/api/v1/user/login`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        navigate('/');
        toast.success(res.data.message);
        setInput({ email: '', password: '' });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <Box sx={{ backgroundColor: '#111827', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            padding: { xs: '2rem', sm: '3rem' },
            borderRadius: '1rem',
            backgroundColor: '#1f2937',
          }}
        >
          <Box textAlign="center" mb={4}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#ffffff', mb: 1 }}>
              Login to The CMDians Memories
            </Typography>
            <Typography variant="body2" sx={{ color: '#9ca3af' }}>
              Welcome back! Please enter your details.
            </Typography>
          </Box>

          <Box component="form" onSubmit={loginHandler} noValidate>
            <Stack spacing={3}>
              <TextField
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                value={input.email}
                onChange={changeEventHandler}
                required
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '0.75rem',
                    backgroundColor: '#374151',
                    color: '#ffffff',
                    '& fieldset': {
                      borderColor: '#4b5563',
                    },
                    '&:hover fieldset': {
                      borderColor: '#3b82f6',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#9ca3af',
                    '&.Mui-focused': {
                      color: '#3b82f6',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: '#ffffff',
                  },
                }}
              />
              <TextField
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={input.password}
                onChange={changeEventHandler}
                required
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '0.75rem',
                    backgroundColor: '#374151',
                    color: '#ffffff',
                    '& fieldset': {
                      borderColor: '#4b5563',
                    },
                    '&:hover fieldset': {
                      borderColor: '#3b82f6',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#9ca3af',
                    '&.Mui-focused': {
                      color: '#3b82f6',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: '#ffffff',
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  borderRadius: '0.75rem',
                  backgroundColor: loading ? '#4b5563' : '#3b82f6',
                  '&:hover': {
                    backgroundColor: loading ? '#4b5563' : '#2563eb',
                  },
                  textTransform: 'none',
                  fontWeight: 600,
                  py: 1.5,
                }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: '#ffffff' }} /> : 'Login'}
              </Button>
            </Stack>
          </Box>

          <Box mt={4} textAlign="center">
            <Typography variant="body2" sx={{ color: '#9ca3af' }}>
              Don't have an account?{' '}
              <Link href="/signup" sx={{ color: '#3b82f6', '&:hover': { color: '#2563eb' } }}>
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
