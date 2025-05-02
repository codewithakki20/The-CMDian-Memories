import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { setAuthUser } from '../redux/authSlice';
import { Avatar, Button, CircularProgress, TextField, InputLabel, MenuItem, Select, FormControl, Typography } from '@mui/material';

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
        console.log(input);
        const formData = new FormData();
        formData.append("bio", input.bio);
        formData.append("gender", input.gender);
        if (input.profilePhoto) {
            formData.append("profilePhoto", input.profilePhoto);
        }
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:5000/api/v1/user/profile/edit', formData, {
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
            toast.error(error.response.data.messasge);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row max-w-3xl mx-auto p-5">
            <section className="flex flex-col gap-6 w-full my-8 bg-white shadow-md p-6 rounded-lg lg:w-2/3">
                <Typography variant="h5" className="font-bold mb-4 text-gray-800">Edit Profile</Typography>

                <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <Avatar alt="Profile Picture" src={user?.profilePicture} sx={{ width: 56, height: 56 }} />
                        <div>
                            <Typography variant="body1" className="font-semibold text-gray-800">{user?.username}</Typography>
                            <Typography variant="body2" className="text-gray-500">{user?.bio || 'Bio here...'}</Typography>
                        </div>
                    </div>
                    <input ref={imageRef} onChange={fileChangeHandler} type="file" className="hidden" />
                    <Button
                        onClick={() => imageRef?.current.click()}
                        variant="contained"
                        color="primary"
                        className="py-2 px-6 text-white rounded-lg"
                    >
                        Change Photo
                    </Button>
                </div>

                <div>
                    <Typography variant="h6" className="font-bold mb-2 text-gray-700">Bio</Typography>
                    <TextField
                        value={input.bio}
                        onChange={(e) => setInput({ ...input, bio: e.target.value })}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Write something about yourself..."
                        className="mb-4"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                            },
                        }}
                    />
                </div>

                <div>
                    <Typography variant="h6" className="font-bold mb-2 text-gray-700">Gender</Typography>
                    <FormControl fullWidth>
                        <InputLabel id="gender-label">Gender</InputLabel>
                        <Select
                            labelId="gender-label"
                            value={input.gender}
                            onChange={(e) => selectChangeHandler(e.target.value)}
                            label="Gender"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                },
                            }}
                        >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className="flex justify-end mt-6">
                    {
                        loading ? (
                            <Button variant="contained" color="primary" disabled className="py-2 px-6 text-white">
                                <CircularProgress size={24} sx={{ color: 'white' }} />
                                Please wait...
                            </Button>
                        ) : (
                            <Button
                                onClick={editProfileHandler}
                                variant="contained"
                                color="primary"
                                className="py-2 px-6 text-white rounded-lg"
                            >
                                Submit
                            </Button>
                        )
                    }
                </div>
            </section>
        </div>
    );
};

export default EditProfile;
