import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Paper, Typography, Box, TextField, Button, CircularProgress, Stack, Link as MuiLink } from '@mui/material';
import server from '../api/axiosInstance';

const Signup = () => {
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${server}/api/v1/user/register`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate('/login');
        toast.success(res.data.message);
        setInput({
          username: '',
          email: '',
          password: '',
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
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
    <Container maxWidth="sm" className="mt-16 bg-gray-900 min-h-screen">
      <Paper
        elevation={6}
        sx={{ p: 6, borderRadius: '1rem', backgroundColor: '#1f2937' }}
      >
        <Box textAlign="center" className="mb-8">
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontWeight: 700, color: '#ffffff', mb: 2 }}
          >
            Create an Account
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: '#9ca3af' }}
          >
            Join The CMDians Memories today!
          </Typography>
        </Box>

        <form onSubmit={signupHandler} className="flex flex-col gap-6">
          <Stack spacing={3}>
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: '#ffffff', mb: 1 }}
              >
                Username
              </Typography>
              <TextField
                fullWidth
                type="text"
                name="username"
                value={input.username}
                onChange={changeEventHandler}
                variant="outlined"
                required
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
                  '& .MuiInputBase-input': {
                    color: '#ffffff',
                  },
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: '#ffffff', mb: 1 }}
              >
                Email
              </Typography>
              <TextField
                fullWidth
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                variant="outlined"
                required
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
                  '& .MuiInputBase-input': {
                    color: '#ffffff',
                  },
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: '#ffffff', mb: 1 }}
              >
                Password
              </Typography>
              <TextField
                fullWidth
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                variant="outlined"
                required
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
                  '& .MuiInputBase-input': {
                    color: '#ffffff',
                  },
                }}
              />
            </Box>

            {loading ? (
              <Button
                fullWidth
                variant="contained"
                disabled
                sx={{
                  borderRadius: '0.75rem',
                  backgroundColor: '#4b5563',
                  color: '#ffffff',
                  py: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CircularProgress size={24} sx={{ color: '#ffffff', mr: 2 }} />
                Please wait...
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  borderRadius: '0.75rem',
                  backgroundColor: '#3b82f6',
                  '&:hover': { backgroundColor: '#2563eb' },
                  textTransform: 'none',
                  fontWeight: 600,
                  py: 1.5,
                }}
              >
                Signup
              </Button>
            )}
          </Stack>

          <Box mt={4} textAlign="center">
            <Typography
              variant="body2"
              sx={{ color: '#9ca3af' }}
            >
              Already have an account?{' '}
              <MuiLink
                href="/login"
                sx={{ color: '#3b82f6', '&:hover': { color: '#2563eb' } }}
              >
                Login
              </MuiLink>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Signup;