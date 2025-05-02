import React, { useEffect, useState } from 'react';
import {
  Dialog, Avatar, IconButton, TextField, Typography,
  Box, Button, DialogContent
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch, useSelector } from 'react-redux';
import Comment from '../pages/Comment';
import axios from 'axios';
import { toast } from 'sonner';
import { setPosts } from '../redux/postSlice';

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState('');
  const { selectedPost, posts } = useSelector((store) => store.post);
  const [comment, setComment] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost.comments);
    }
  }, [selectedPost]);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    setText(inputText.trim() ? inputText : '');
  };

  const sendMessageHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/post/${selectedPost?._id}/comment`,
        { text },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map((p) =>
          p._id === selectedPost._id ? { ...p, comments: updatedCommentData } : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!selectedPost) return null;

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
      <DialogContent className="!p-0">
        <Box className="flex flex-col md:flex-row bg-gray-900 text-white rounded-lg overflow-hidden">
          {/* Left - Post Image */}
          <Box className="md:w-1/2 w-full h-96 md:h-auto bg-black">
            <img
              src={selectedPost?.image}
              alt="post_img"
              className="w-full h-full object-cover"
            />
          </Box>

          {/* Right - Comments Section */}
          <Box className="md:w-1/2 w-full flex flex-col justify-between p-4 bg-gray-900">
            {/* Header */}
            <Box className="flex items-center justify-between mb-4">
              <Box className="flex items-center gap-3">
                <Avatar src={selectedPost?.author?.profilePicture} />
                <Typography variant="subtitle2" className="text-white">
                  {selectedPost?.author?.username}
                </Typography>
              </Box>
              <IconButton className="text-gray-300 hover:text-blue-500">
                <MoreHorizIcon />
              </IconButton>
            </Box>

            {/* Comments */}
            <Box className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-gray-700">
              {comment.map((c) => (
                <Comment key={c._id} comment={c} />
              ))}
            </Box>

            {/* Input */}
            <Box className="pt-4 flex items-center gap-3 border-t border-gray-700 mt-4">
              <TextField
                fullWidth
                placeholder="Add a comment..."
                size="small"
                value={text}
                onChange={changeEventHandler}
                variant="outlined"
                InputProps={{
                  className: 'bg-gray-800 text-white rounded-md',
                }}
              />
              <Button
                variant="contained"
                disabled={!text.trim()}
                onClick={sendMessageHandler}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Send
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
