import React, { useRef, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../redux/postSlice';
import { readFileAsDataURL } from '../lib/utils';

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState('');
  const [caption, setCaption] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
    }
  };

  const createPostHandler = async () => {
    const formData = new FormData();
    formData.append('caption', caption);
    if (imagePreview) formData.append('image', file);

    try {
      setLoading(true);
      const res = await axios.post(
        'https://the-cmdian-memories.onrender.com/api/v1/post/addpost',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setPosts([res.data.post, ...posts]));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle className="text-center font-bold text-lg text-gray-800">
        Create New Post
      </DialogTitle>
      <DialogContent className="px-5 py-4">
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar src={user?.profilePicture} sx={{ width: 40, height: 40 }} />
          <Box>
            <Typography variant="subtitle2" className="font-semibold text-gray-700">
              {user?.username}
            </Typography>
            <Typography variant="caption" className="text-gray-500">
              Bio here...
            </Typography>
          </Box>
        </Box>

        <TextField
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          margin="dense"
          className="mb-4"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
            },
          }}
        />

        {imagePreview && (
          <Box
            mt={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={250}
            overflow="hidden"
            borderRadius={2}
            sx={{ border: '1px solid #ccc' }}
          >
            <img
              src={imagePreview}
              alt="preview"
              className="w-full h-full object-cover rounded-md"
            />
          </Box>
        )}

        <input
          ref={imageRef}
          type="file"
          accept="image/*"
          hidden
          onChange={fileChangeHandler}
        />

        <Box mt={3} textAlign="center">
          <Button
            variant="contained"
            onClick={() => imageRef.current.click()}
            className="bg-blue-500 hover:bg-blue-400 text-white rounded-full py-2 px-6"
          >
            Select from computer
          </Button>
        </Box>

        {imagePreview && (
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={createPostHandler}
              disabled={loading}
              startIcon={loading && <CircularProgress size={18} sx={{ color: 'white' }} />}
              className="py-2 text-lg font-semibold"
            >
              {loading ? 'Please wait...' : 'Post'}
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
