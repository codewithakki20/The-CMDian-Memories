import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Container, Paper, Typography, Box, TextField, Button, CircularProgress, Stack, Link as MuiLink } from '@mui/material';

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
      const res = await axios.post('https://the-cmdian-memories.onrender.com/api/v1/user/register', input, {
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
  }, [user]);

  return (
    <Container maxWidth="sm" className="mt-10">
      <Paper elevation={6} className="p-5 rounded-lg shadow-lg">
        <Box textAlign="center" className="mb-4">
          <Typography component="h1" variant="h4" className="font-bold text-[#3498db]" gutterBottom>
            Create an Account
          </Typography>
          <Typography variant="body2" className="text-gray-500">
            Join The CMDians Memories today!
          </Typography>
        </Box>

        <form onSubmit={signupHandler} className="flex flex-col gap-6 p-8">
          <Stack spacing={3}>
            <div>
              <span className="font-medium text-sm">Username</span>
              <TextField
                fullWidth
                type="text"
                name="username"
                value={input.username}
                onChange={changeEventHandler}
                variant="outlined"
                required
                className="my-2"
              />
            </div>
            <div>
              <span className="font-medium text-sm">Email</span>
              <TextField
                fullWidth
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                variant="outlined"
                required
                className="my-2"
              />
            </div>
            <div>
              <span className="font-medium text-sm">Password</span>
              <TextField
                fullWidth
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                variant="outlined"
                required
                className="my-2"
              />
            </div>

            {loading ? (
              <Button
                fullWidth
                variant="contained"
                disabled
                className="flex items-center justify-center bg-gray-500"
              >
                <CircularProgress size={24} className="text-white" />
                <span className="ml-2 text-white">Please wait...</span>
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="bg-gradient-to-r from-[#3498db] to-[#2ecc71] text-white font-bold hover:from-[#2ecc71] hover:to-[#3498db] transition-all duration-300"
              >
                Signup
              </Button>
            )}
          </Stack>

          <Box mt={4} textAlign="center">
            <Typography variant="body2" className="text-gray-600">
              Already have an account?{' '}
              <MuiLink
                href="/login"
                className="text-[#3498db] hover:text-[#2ecc71] font-semibold"
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
