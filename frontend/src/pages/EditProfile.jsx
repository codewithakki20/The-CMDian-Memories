import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { setAuthUser } from '../redux/authSlice';
import { Avatar, Button, CircularProgress, TextField, InputLabel, MenuItem, Select, FormControl, Typography } from '@mui/material';
import server from '../api/axiosInstance';

const EditProfile = () => {
    const imageRef = useRef();
    const { user } = useSelector((store) => store.auth);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        profilePhoto: user?.profilePicture,
        bio: user?.bio,
        gender: user?.gender
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) setInput({ ...input, profilePhoto: file });
    };

    const selectChangeHandler = (value) => {
        setInput({ ...input, gender: value });
    };

    const editProfileHandler = async () => {
        const formData = new FormData();
        formData.append("bio", input.bio);
        formData.append("gender", input.gender);
        if (input.profilePhoto) {
            formData.append("profilePhoto", input.profilePhoto);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${server}/api/v1/user/profile/edit`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                const updatedUserData = {
                    ...user,
                    bio: res.data.user?.bio,
                    profilePicture: res.data.user?.profilePicture,
                    gender: res.data.user.gender
                };
                dispatch(setAuthUser(updatedUserData));
                navigate(`/profile/${user?._id}`);
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row max-w-4xl mx-auto p-6 bg-gray-900 min-h-screen">
            <section className="flex flex-col gap-8 w-full my-10 bg-gray-800 shadow-xl p-8 rounded-2xl lg:w-2/3">
                <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, color: '#ffffff', mb: 4 }}
                >
                    Edit Profile
                </Typography>

                <div className="flex items-center justify-between bg-gray-700/50 rounded-xl p-6">
                    <div className="flex items-center gap-4">
                        <Avatar
                            alt="Profile Picture"
                            src={user?.profilePicture}
                            sx={{ width: 64, height: 64, border: '2px solid #3b82f6' }}
                        />
                        <div>
                            <Typography
                                variant="body1"
                                sx={{ fontWeight: 600, color: '#ffffff' }}
                            >
                                {user?.username}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: '#9ca3af' }}
                            >
                                {user?.bio || 'Bio here...'}
                            </Typography>
                        </div>
                    </div>
                    <input ref={imageRef} onChange={fileChangeHandler} type="file" className="hidden" />
                    <Button
                        onClick={() => imageRef?.current.click()}
                        variant="contained"
                        sx={{
                            borderRadius: '0.75rem',
                            backgroundColor: '#3b82f6',
                            '&:hover': { backgroundColor: '#2563eb' },
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 4,
                            py: 1,
                        }}
                    >
                        Change Photo
                    </Button>
                </div>

                <div>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, color: '#ffffff', mb: 2 }}
                    >
                        Bio
                    </Typography>
                    <TextField
                        value={input.bio}
                        onChange={(e) => setInput({ ...input, bio: e.target.value })}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Write something about yourself..."
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
                </div>

                <div>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, color: '#ffffff', mb: 2 }}
                    >
                        Gender
                    </Typography>
                    <FormControl fullWidth>
                        <InputLabel
                            id="gender-label"
                            sx={{ color: '#9ca3af', '&.Mui-focused': { color: '#3b82f6' } }}
                        >
                            Gender
                        </InputLabel>
                        <Select
                            labelId="gender-label"
                            value={input.gender}
                            onChange={(e) => selectChangeHandler(e.target.value)}
                            label="Gender"
                            sx={{
                                borderRadius: '0.75rem',
                                backgroundColor: '#374151',
                                color: '#ffffff',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#4b5563',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#3b82f6',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#3b82f6',
                                },
                                '& .MuiSelect-icon': {
                                    color: '#9ca3af',
                                },
                            }}
                        >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className="flex justify-end mt-8">
                    {loading ? (
                        <Button
                            variant="contained"
                            disabled
                            sx={{
                                borderRadius: '0.75rem',
                                backgroundColor: '#4b5563',
                                color: '#ffffff',
                                px: 4,
                                py: 1,
                            }}
                        >
                            <CircularProgress size={24} sx={{ color: '#ffffff', mr: 2 }} />
                            Please wait...
                        </Button>
                    ) : (
                        <Button
                            onClick={editProfileHandler}
                            variant="contained"
                            sx={{
                                borderRadius: '0.75rem',
                                backgroundColor: '#3b82f6',
                                '&:hover': { backgroundColor: '#2563eb' },
                                textTransform: 'none',
                                fontWeight: 600,
                                px: 4,
                                py: 1,
                            }}
                        >
                            Submit
                        </Button>
                    )}
                </div>
            </section>
        </div>
    );
};

export default EditProfile;