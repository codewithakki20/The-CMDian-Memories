import React, { useState } from 'react';
import useGetUserProfile from '../hooks/useGetUserProfile';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Badge, Avatar, Typography } from '@mui/material';
import { AtSign, Heart, MessageCircle } from 'lucide-react';
import { followUser, unfollowUser } from '../redux/authSlice';

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  const { loading, error } = useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState('posts');
  const dispatch = useDispatch();

  const { userProfile, user } = useSelector(store => store.auth);

  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isFollowing = userProfile?.followers.includes(user?._id);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleFollowUnfollow = () => {
    if (isFollowing) {
      dispatch(unfollowUser(userProfile?._id));
    } else {
      dispatch(followUser(userProfile?._id));
    }
  };

  const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

  if (loading) {
    return <div className="text-center text-gray-400">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-400">Error loading profile. Please try again later.</div>;
  }

  return (
    <div className="flex flex-col items-center mx-auto max-w-7xl p-6 sm:px-10 bg-gray-900 min-h-screen">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-12">
        {/* Profile Section */}
        <section className="flex flex-col items-center">
          <Avatar
            alt="profilephoto"
            src={userProfile?.profilePicture}
            sx={{ width: 144, height: 144, border: '4px solid #3b82f6' }}
            className="shadow-lg"
          />
          <div className="mt-6 text-center">
            <Typography
              variant="h5"
              sx={{ color: '#ffffff', fontWeight: 600 }}
            >
              {userProfile?.username}
            </Typography>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              {isLoggedInUserProfile ? (
                <>
                  <Link to="/account/edit">
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: '#3b82f6',
                        color: '#3b82f6',
                        borderRadius: '0.75rem',
                        textTransform: 'none',
                        '&:hover': { backgroundColor: '#3b82f6', color: '#ffffff' },
                        px: 3,
                      }}
                    >
                      Edit profile
                    </Button>
                  </Link>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: '#3b82f6',
                      color: '#3b82f6',
                      borderRadius: '0.75rem',
                      textTransform: 'none',
                      '&:hover': { backgroundColor: '#3b82f6', color: '#ffffff' },
                      px: 3,
                    }}
                  >
                    View archive
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: '#3b82f6',
                      color: '#3b82f6',
                      borderRadius: '0.75rem',
                      textTransform: 'none',
                      '&:hover': { backgroundColor: '#3b82f6', color: '#ffffff' },
                      px: 3,
                    }}
                  >
                    Ad tools
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    onClick={handleFollowUnfollow}
                    sx={{
                      backgroundColor: isFollowing ? '#374151' : '#3b82f6',
                      color: '#ffffff',
                      borderRadius: '0.75rem',
                      textTransform: 'none',
                      '&:hover': { backgroundColor: isFollowing ? '#4b5563' : '#2563eb' },
                      px: 4,
                      py: 1,
                    }}
                  >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: '#3b82f6',
                      color: '#3b82f6',
                      borderRadius: '0.75rem',
                      textTransform: 'none',
                      '&:hover': { backgroundColor: '#3b82f6', color: '#ffffff' },
                      px: 4,
                      py: 1,
                    }}
                  >
                    Message
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section>
          <div className="flex justify-between items-center">
            <div className="flex gap-8">
              <div className="text-center">
                <Typography
                  variant="h6"
                  sx={{ color: '#ffffff', fontWeight: 600 }}
                >
                  {userProfile?.posts.length}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#9ca3af' }}
                >
                  posts
                </Typography>
              </div>
              <div className="text-center">
                <Typography
                  variant="h6"
                  sx={{ color: '#ffffff', fontWeight: 600 }}
                >
                  {userProfile?.followers.length}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#9ca3af' }}
                >
                  followers
                </Typography>
              </div>
              <div className="text-center">
                <Typography
                  variant="h6"
                  sx={{ color: '#ffffff', fontWeight: 600 }}
                >
                  {userProfile?.following.length}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#9ca3af' }}
                >
                  following
                </Typography>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Typography
              variant="body1"
              sx={{ color: '#d1d5db', fontWeight: 500 }}
            >
              {userProfile?.bio || 'This user has no bio.'}
            </Typography>
            <div className="mt-3 flex items-center">
              <Badge
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#3b82f6',
                    color: '#ffffff',
                    padding: '0.25rem',
                    borderRadius: '0.5rem',
                  },
                }}
              >
                <AtSign className="text-blue-400 mr-1" size={18} />
                <Typography
                  variant="body2"
                  sx={{ color: '#ffffff' }}
                >
                  {userProfile?.username}
                </Typography>
              </Badge>
            </div>
          </div>
        </section>
      </div>

      {/* Tabs Section */}
      <div className="border-t border-gray-700 mt-8 w-full">
        <div className="flex justify-center gap-12 text-lg">
          <Typography
            className={`py-4 cursor-pointer ${activeTab === 'posts' ? 'text-blue-400 font-bold border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
            onClick={() => handleTabChange('posts')}
            sx={{ fontWeight: activeTab === 'posts' ? 600 : 400 }}
          >
            POSTS
          </Typography>
          <Typography
            className={`py-4 cursor-pointer ${activeTab === 'saved' ? 'text-blue-400 font-bold border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
            onClick={() => handleTabChange('saved')}
            sx={{ fontWeight: activeTab === 'saved' ? 600 : 400 }}
          >
            SAVED
          </Typography>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          {displayedPost?.map((post) => (
            <div key={post?._id} className="relative group">
              <img
                src={post.image}
                alt="postimage"
                className="rounded-lg w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105 shadow-md"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <div className="flex items-center text-white space-x-6">
                  <button className="flex items-center gap-2 hover:text-gray-300">
                    <Heart size={20} />
                    <span>{post?.likes.length}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-gray-300">
                    <MessageCircle size={20} />
                    <span>{post?.comments.length}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;