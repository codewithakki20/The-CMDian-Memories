import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Badge,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Home as HomeIcon,
  Message as MessageIcon,
  AddBox as AddIcon,
  Favorite as FavoriteIcon,
  AccountCircle as AccountIcon,
  ExitToApp as LogoutIcon,
  Group as GroupIcon,
  PhotoLibrary as PhotoLibraryIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setAuthUser } from "../redux/authSlice";
import { setPosts, setSelectedPost } from "../redux/postSlice";
import CreatePost from "../pages/CreatePost";
import server from "../api/axiosInstance";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { likeNotification } = useSelector(
    (store) => store.realTimeNotification
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);
  const openMobileMenu = Boolean(mobileAnchorEl);

  const [openPostDialog, setOpenPostDialog] = useState(false);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleMobileMenuOpen = (event) => setMobileAnchorEl(event.currentTarget);
  const handleMobileMenuClose = () => setMobileAnchorEl(null);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    handleMenuClose();
    handleMobileMenuClose();
  };

  const handleNavigation = (type) => {
    switch (type) {
      case "Home":
        navigate("/");
        break;
      case "Messages":
        navigate("/chat");
        break;
      case "Create":
        setOpenPostDialog(true);
        break;
      case "Users":
        navigate("/users");
        break;
      case "Gallery":
        navigate("/gallery");
        break;
      case "Profile":
        navigate(`/profile/${user?._id}`);
        break;
      case "Notifications":
        toast.info("Notifications feature coming soon.");
        break;
      default:
        break;
    }
    handleMenuClose();
    handleMobileMenuClose();
  };

  return (
    <AppBar
      position="sticky"
      elevation={2}
      sx={{
        background: '#1f2937',
        borderBottom: '1px solid #374151',
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }} className="px-4">
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ color: '#3b82f6', fontWeight: 700, fontSize: '1.5rem' }}
          >
            The CMDian Memories
          </Typography>
        </Box>

        {/* Mobile Menu Button on the Right */}
        {isMobile && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={handleMobileMenuOpen}
              sx={{ color: '#9ca3af', '&:hover': { color: '#3b82f6' } }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileAnchorEl}
              open={openMobileMenu}
              onClose={handleMobileMenuClose}
              PaperProps={{
                elevation: 4,
                sx: {
                  mt: 1.5,
                  minWidth: 200,
                  borderRadius: '0.75rem',
                  backgroundColor: '#1f2937',
                  color: '#ffffff',
                },
              }}
            >
              <MenuItem onClick={() => handleNavigation("Home")}>
                <HomeIcon fontSize="small" sx={{ mr: 1, color: '#9ca3af' }} />
                Home
              </MenuItem>
              <MenuItem onClick={() => handleNavigation("Gallery")}>
                <PhotoLibraryIcon fontSize="small" sx={{ mr: 1, color: '#9ca3af' }} />
                Gallery
              </MenuItem>
              <MenuItem onClick={() => handleNavigation("Users")}>
                <GroupIcon fontSize="small" sx={{ mr: 1, color: '#9ca3af' }} />
                Users
              </MenuItem>
              <MenuItem onClick={() => handleNavigation("Create")}>
                <AddIcon fontSize="small" sx={{ mr: 1, color: '#9ca3af' }} />
                Create
              </MenuItem>
              <MenuItem onClick={() => handleNavigation("Notifications")}>
                <FavoriteIcon fontSize="small" sx={{ mr: 1, color: '#9ca3af' }} />
                Notifications
              </MenuItem>
              <MenuItem onClick={() => handleNavigation("Profile")}>
                <AccountIcon fontSize="small" sx={{ mr: 1, color: '#9ca3af' }} />
                My Profile
              </MenuItem>
              <Divider sx={{ backgroundColor: '#374151' }} />
              <MenuItem onClick={logoutHandler} sx={{ color: '#ef4444' }}>
                <LogoutIcon fontSize="small" sx={{ mr: 1, color: '#ef4444' }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}

        {/* Desktop Navigation Buttons */}
        {!isMobile && user && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {navItem("Home", HomeIcon, handleNavigation)}
            {navItem("Gallery", PhotoLibraryIcon, handleNavigation)}
            {navItem("Users", GroupIcon, handleNavigation)}
            {navItem("Messages", MessageIcon, handleNavigation)}
            {navItem("Create", AddIcon, handleNavigation)}
            {navItemWithBadge(
              "Notifications",
              FavoriteIcon,
              likeNotification.length,
              handleNavigation
            )}
          </Box>
        )}

        {/* Avatar and Dropdown Menu for Profile (Desktop) */}
        {user && !isMobile && (
          <IconButton
            onClick={handleMenuOpen}
            size="small"
            sx={{ p: 0 }}
          >
            {user?.profilePicture ? (
              <Avatar
                src={user.profilePicture}
                alt={user.username}
                sx={{ width: 40, height: 40, border: '2px solid #3b82f6' }}
              />
            ) : (
              <AccountIcon sx={{ color: '#9ca3af', fontSize: '2rem' }} />
            )}
          </IconButton>
        )}

        {/* Menu for Profile and Logout */}
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 4,
            sx: {
              mt: 1.5,
              minWidth: 160,
              borderRadius: '0.75rem',
              backgroundColor: '#1f2937',
              color: '#ffffff',
            },
          }}
        >
          <MenuItem
            onClick={() => handleNavigation("Profile")}
            sx={{ '&:hover': { backgroundColor: '#374151' } }}
          >
            My Profile
          </MenuItem>
          <Divider sx={{ backgroundColor: '#374151' }} />
          <MenuItem
            onClick={logoutHandler}
            sx={{ color: '#ef4444', '&:hover': { backgroundColor: '#374151' } }}
          >
            <LogoutIcon fontSize="small" sx={{ mr: 1, color: '#ef4444' }} />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>

      <CreatePost open={openPostDialog} setOpen={setOpenPostDialog} />
    </AppBar>
  );
};

// ========== Styled Navigation Buttons ==========

const navItem = (label, Icon, onClick) => (
  <Button
    startIcon={<Icon sx={{ color: '#9ca3af' }} />}
    onClick={() => onClick(label)}
    sx={{
      color: '#ffffff',
      fontWeight: 500,
      px: 2,
      py: 1,
      borderRadius: '0.75rem',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#374151',
        color: '#3b82f6',
      },
    }}
  >
    {label}
  </Button>
);

const navItemWithBadge = (label, Icon, count, onClick) => (
  <Button
    startIcon={
      count > 0 ? (
        <Badge badgeContent={count} color="error">
          <Icon sx={{ color: '#9ca3af' }} />
        </Badge>
      ) : (
        <Icon sx={{ color: '#9ca3af' }} />
      )
    }
    onClick={() => onClick(label)}
    sx={{
      color: '#ffffff',
      fontWeight: 500,
      px: 2,
      py: 1,
      borderRadius: '0.75rem',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#374151',
        color: '#3b82f6',
      },
    }}
  >
    {label}
  </Button>
);

export default Navbar;