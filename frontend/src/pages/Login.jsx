import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button, Link, CircularProgress, Paper, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setAuthUser } from '../redux/authSlice';
import { toast } from 'sonner';

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
            const res = await axios.post('http://localhost:5000/api/v1/user/login', input, {
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
        <Container maxWidth="sm" className="mt-12">
            <Paper elevation={6} className="p-8 rounded-xl shadow-lg">
                <Box className="text-center mb-6">
                    <Typography variant="h4" className="font-bold text-blue-600 mb-4">
                        Login to The CMDians Memories
                    </Typography>
                    <Typography variant="body2" className="text-gray-500">
                        Welcome back! Please enter your details.
                    </Typography>
                </Box>

                <Box component="form" onSubmit={loginHandler} noValidate>
                    <Stack spacing={4}>
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
                            className="bg-gray-50"
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
                            className="bg-gray-50"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={loading}
                            className="bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold hover:from-teal-400 hover:to-blue-500"
                        >
                            {loading ? <CircularProgress size={24} className="text-white" /> : 'Login'}
                        </Button>
                    </Stack>
                </Box>

                <Box mt={4} className="text-center">
                    <Typography variant="body2" className="text-gray-500">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-blue-500 hover:text-teal-400">
                            Sign Up
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
