import React, { useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import { Bookmark, Message, MoreHoriz, Share  } from '@mui/icons-material';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { setPosts, setSelectedPost } from '../redux/postSlice';
import CommentDialog from '../components/CommentDialog';

const Post = ({ post }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const { user } = useSelector(state => state.auth);
  const { posts } = useSelector(state => state.post);
  const [liked, setLiked] = useState(post.likes.includes(user?._id));
  const [postLike, setPostLike] = useState(post.likes.length);
  const [comment, setComment] = useState(post.comments);
  const dispatch = useDispatch();

  const handleMenuOpen = (e) => setMenuAnchor(e.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? 'dislike' : 'like';
      const res = await axios.get(`https://the-cmdian-memories.onrender.com/api/v1/post/${post._id}/${action}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes);
        setLiked(!liked);
        const updatedPosts = posts.map(p =>
          p._id === post._id
            ? {
              ...p,
              likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id]
            }
            : p
        );
        dispatch(setPosts(updatedPosts));
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const commentHandler = async () => {
    try {
      const res = await axios.post(
        `https://the-cmdian-memories.onrender.com/api/v1/post/${post._id}/comment`,
        { text },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedComments = [...comment, res.data.comment];
        setComment(updatedComments);
        const updatedPosts = posts.map(p =>
          p._id === post._id ? { ...p, comments: updatedComments } : p
        );
        dispatch(setPosts(updatedPosts));
        setText("");
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(`https://the-cmdian-memories.onrender.com/api/v1/post/delete/${post._id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        const updatedPosts = posts.filter(p => p._id !== post._id);
        dispatch(setPosts(updatedPosts));
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  const bookmarkHandler = async () => {
    try {
      const res = await axios.get(`https://the-cmdian-memories.onrender.com/api/v1/post/${post._id}/bookmark`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="my-10 mx-auto w-full max-w-md bg-white shadow rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <Avatar src={post.author?.profilePicture} />
          <div className="flex items-center gap-2">
            <Typography variant="subtitle1">{post.author?.username}</Typography>
            {user?._id === post.author?._id && (
              <Badge color="secondary" variant="dot">Author</Badge>
            )}
          </div>
        </div>
        <IconButton onClick={handleMenuOpen}>
          <MoreHoriz />
        </IconButton>
        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
          {post?.author?._id !== user?._id && <MenuItem>Unfollow</MenuItem>}
          <MenuItem onClick={bookmarkHandler}>Add to favorites</MenuItem>
          {user?._id === post?.author?._id && (
            <MenuItem onClick={deletePostHandler}>Delete</MenuItem>
          )}
        </Menu>
      </div>

      {/* Image */}
      <img src={post.image} alt="Post" className="w-full object-cover aspect-square" />

      {/* Actions */}
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex gap-2">
          <IconButton onClick={likeOrDislikeHandler}>
            {liked ? <FaHeart className="text-red-600" size={22} /> : <FaRegHeart size={22} />}
          </IconButton>
          <IconButton onClick={() => { dispatch(setSelectedPost(post)); setOpen(true); }}>
            <Message />
          </IconButton>
          <IconButton>
  <Share />
</IconButton>
        </div>
        <IconButton onClick={bookmarkHandler}>
          <Bookmark />
        </IconButton>
      </div>

      {/* Likes */}
      <Typography variant="body2" className="px-4">{postLike} likes</Typography>

      {/* Caption */}
      <Typography variant="body2" className="px-4 py-1">
        <strong>{post.author?.username}</strong> {post.caption}
      </Typography>

      {/* Comments */}
      {comment.length > 0 && (
        <Typography
          variant="body2"
          className="text-gray-500 px-4 cursor-pointer"
          onClick={() => { dispatch(setSelectedPost(post)); setOpen(true); }}
        >
          View all {comment.length} comments
        </Typography>
      )}

      {/* Comment input */}
      <div className="flex items-center gap-2 px-4 py-3">
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value.trim() ? e.target.value : "")}
          placeholder="Add a comment..."
          variant="standard"
          fullWidth
        />
        {text && (
          <Button onClick={commentHandler} variant="text" sx={{ color: '#3BADF8' }}>
            Post
          </Button>
        )}
      </div>

      {/* Comment Dialog */}
      <CommentDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Post;
