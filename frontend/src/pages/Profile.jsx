// Profile.js
import React, { useState } from 'react';
import useGetUserProfile from '../hooks/useGetUserProfile';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { AtSign, Heart, MessageCircle } from 'lucide-react';
import { followUser, unfollowUser } from '../redux/authSlice';  // Import actions

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  const { loading, error } = useGetUserProfile(userId); // Get loading and error states
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
      dispatch(unfollowUser(userProfile?._id));  // Dispatch unfollow action
    } else {
      dispatch(followUser(userProfile?._id));  // Dispatch follow action
    }
  };

  const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

  if (loading) {
    return <div>Loading...</div>;  // Show loading message
  }

  if (error) {
    return <div>Error loading profile. Please try again later.</div>;  // Show error message
  }

  return (
    <div className='flex flex-col items-center mx-auto max-w-7xl p-6 sm:px-10'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-10'>
        {/* Profile Section */}
        <section className='flex flex-col items-center'>
          <Avatar 
            alt="profilephoto" 
            src={userProfile?.profilePicture} 
            sx={{ width: 128, height: 128 }}
            className='border-4 border-blue-500'
          />
          <div className='mt-4 text-center'>
            <span className='text-2xl font-semibold'>{userProfile?.username}</span>
            <div className='mt-2'>
              {isLoggedInUserProfile ? (
                <>
                  <Link to="/account/edit"><Button variant='outlined' className='hover:bg-gray-200 mt-2 text-sm'>Edit profile</Button></Link>
                  <Button variant='outlined' className='hover:bg-gray-200 mt-2 text-sm'>View archive</Button>
                  <Button variant='outlined' className='hover:bg-gray-200 mt-2 text-sm'>Ad tools</Button>
                </>
              ) : (
                <>
                  <Button 
                    variant='outlined' 
                    className='h-8 mt-2 text-sm' 
                    onClick={handleFollowUnfollow}
                  >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                  </Button>
                  <Button variant='outlined' className='h-8 mt-2 text-sm'>Message</Button>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section>
          <div className='flex justify-between items-center'>
            <div className='flex gap-4'>
              <p className='text-lg font-semibold'>{userProfile?.posts.length} <span className='text-gray-500'>posts</span></p>
              <p className='text-lg font-semibold'>{userProfile?.followers.length} <span className='text-gray-500'>followers</span></p>
              <p className='text-lg font-semibold'>{userProfile?.following.length} <span className='text-gray-500'>following</span></p>
            </div>
          </div>
          <div className='mt-4'>
            <span className='font-semibold text-sm'>{userProfile?.bio || 'This user has no bio.'}</span>
            <div className='mt-2 flex items-center'>
              <Badge variant='secondary'>
                <AtSign className='text-blue-500' /> 
                <span className='pl-1'>{userProfile?.username}</span>
              </Badge>
            </div>
          </div>
        </section>
      </div>

      {/* Tabs Section */}
      <div className='border-t border-t-gray-200 mt-6'>
        <div className='flex justify-center gap-6 text-lg'>
          <span 
            className={`py-3 cursor-pointer ${activeTab === 'posts' ? 'font-bold text-blue-500' : 'text-gray-600'}`} 
            onClick={() => handleTabChange('posts')}
          >
            POSTS
          </span>
          <span 
            className={`py-3 cursor-pointer ${activeTab === 'saved' ? 'font-bold text-blue-500' : 'text-gray-600'}`} 
            onClick={() => handleTabChange('saved')}
          >
            SAVED
          </span>
        </div>

        {/* Posts Grid */}
        <div className='grid grid-cols-3 gap-4 mt-6'>
          {
            displayedPost?.map((post) => {
              return (
                <div key={post?._id} className='relative group'>
                  <img 
                    src={post.image} 
                    alt='postimage' 
                    className='rounded-lg my-2 w-full aspect-square object-cover transition-transform duration-300 transform group-hover:scale-105'
                  />
                  <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <div className='flex items-center text-white space-x-4'>
                      <button className='flex items-center gap-2 hover:text-gray-300'>
                        <Heart />
                        <span>{post?.likes.length}</span>
                      </button>
                      <button className='flex items-center gap-2 hover:text-gray-300'>
                        <MessageCircle />
                        <span>{post?.comments.length}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Profile;
