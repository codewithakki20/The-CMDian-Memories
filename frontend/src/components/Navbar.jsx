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
      const res = await axios.get("http://localhost:5000/api/v1/user/logout", {
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
      elevation={1}
      sx={{
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(0,0,0,0.12)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }} className="px-4">
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            className="text-blue-600 font-bold text-2xl"
          >
            The CMDian Memories
          </Typography>
        </Box>

        {/* Mobile Menu Button on the Right */}
        {isMobile && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={handleMobileMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileAnchorEl}
              open={openMobileMenu}
              onClose={handleMobileMenuClose}
              PaperProps={{
                elevation: 4,
                sx: { mt: 1.5, minWidth: 180, borderRadius: 2 },
              }}
            >
              <MenuItem onClick={() => handleNavigation("Home")}>
                <HomeIcon fontSize="small" sx={{ mr: 1 }} />
                Home
              </MenuItem>
              <MenuItem onClick={() => handleNavigation("Gallery")}>
                <PhotoLibraryIcon fontSize="small" sx={{ mr: 1 }} />
                Gallery
              </MenuItem>
              <MenuItem onClick={() => handleNavigation("Users")}>
                <GroupIcon fontSize="small" sx={{ mr: 1 }} />
                Users
              </MenuItem>
              <MenuItem onClick={() => handleNavigation("Create")}>
                <AddIcon fontSize="small" sx={{ mr: 1 }} />
                Create
              </MenuItem>
              <MenuItem onClick={() => handleNavigation("Notifications")}>
                <FavoriteIcon fontSize="small" sx={{ mr: 1 }} />
                Notifications
              </MenuItem>
              <MenuItem onClick={() => handleNavigation("Profile")}>
                <AccountIcon fontSize="small" sx={{ mr: 1 }} />
                My Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={logoutHandler} sx={{ color: "red" }}>
                <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
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
          <IconButton onClick={handleMenuOpen} size="small">
            {user?.profilePicture ? (
              <Avatar src={user.profilePicture} alt={user.username} className="w-9 h-9" />
            ) : (
              <AccountIcon className="text-gray-600 text-2xl" />
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
              borderRadius: 2,
            },
          }}
        >
          <MenuItem onClick={() => handleNavigation("Profile")}>My Profile</MenuItem>
          <Divider />
          <MenuItem onClick={logoutHandler} sx={{ color: "red" }}>
            <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
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
    startIcon={<Icon />}
    onClick={() => onClick(label)}
    className="text-gray-900 font-semibold px-4 py-2 rounded-lg hover:bg-blue-100"
  >
    {label}
  </Button>
);

const navItemWithBadge = (label, Icon, count, onClick) => (
  <Button
    startIcon={
      count > 0 ? (
        <Badge badgeContent={count} color="error">
          <Icon />
        </Badge>
      ) : (
        <Icon />
      )
    }
    onClick={() => onClick(label)}
    className="text-gray-900 font-semibold px-4 py-2 rounded-lg hover:bg-blue-100"
  >
    {label}
  </Button>
);

export default Navbar;
