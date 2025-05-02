import React, { useState } from "react";
import {
  Search as SearchIcon,
  Users,
  UserCog,
  LogOut,
  MessageCircle,
} from "lucide-react";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Divider,
  IconButton,
  TextField,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { useChat } from "../../contexts/ChatContext";
import { useNavigate } from "react-router-dom";

const ChatSidebar = () => {
  const { user, logout } = useAuth();
  const { chats, activeChat, setActiveChat, onlineUsers } = useChat();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredChats = chats.filter((chat) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    if (chat.isGroup && chat.groupName) {
      return chat.groupName.toLowerCase().includes(searchLower);
    }
    const otherParticipant = chat.participants.find((p) => p.id !== user?.id);
    return otherParticipant?.username.toLowerCase().includes(searchLower);
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleChatSelect = (chat) => {
    setActiveChat(chat);
  };

  const getChatName = (chat) => {
    if (chat.isGroup) return chat.groupName || "Group Chat";
    const otherParticipant = chat.participants.find((p) => p.id !== user?.id);
    return otherParticipant?.username || "Chat";
  };

  const getLastMessagePreview = (chat) => {
    if (!chat.lastMessage) return "No messages yet";
    const content = chat.lastMessage.content;
    return content.length > 25 ? `${content.substring(0, 25)}...` : content;
  };

  const isUserOnline = (userId) => onlineUsers.includes(userId);

  const getOtherParticipant = (chat) =>
    chat.isGroup ? null : chat.participants.find((p) => p.id !== user?.id);

  return (
    <Box
      sx={{
        width: 320,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #ccc",
        bgcolor: "#f5f5f5",
      }}
    >
      {/* Header */}
      <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" display="flex" alignItems="center" fontWeight={600}>
          <MessageCircle size={20} style={{ marginRight: 8 }} />
          CMDiansChat
        </Typography>
        {user?.role === "admin" && (
          <Tooltip title="Admin Panel">
            <IconButton onClick={() => navigate("/admin")}>
              <UserCog size={20} />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Search */}
      <Box px={2} pb={2}>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Search conversations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <SearchIcon size={16} style={{ marginRight: 8 }} />
            ),
          }}
        />
      </Box>

      <Divider />

      {/* Chat List */}
      <Box flex={1} overflow="auto">
        {filteredChats.length === 0 ? (
          <Box
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            p={4}
          >
            <Users size={48} color="#aaa" />
            <Typography color="textSecondary" mt={1}>
              {searchTerm ? "No chats found" : "No conversations yet"}
            </Typography>
          </Box>
        ) : (
          <List>
            {filteredChats.map((chat) => {
              const isActive = activeChat?.id === chat.id;
              const otherParticipant = getOtherParticipant(chat);
              const online = otherParticipant && isUserOnline(otherParticipant.id);

              return (
                <ListItem
                  key={chat.id}
                  onClick={() => handleChatSelect(chat)}
                  sx={{
                    bgcolor: isActive ? "#e3f2fd" : "transparent",
                    "&:hover": {
                      bgcolor: "#e3f2fd",
                    },
                    cursor: "pointer",
                    px: 2,
                  }}
                  divider
                >
                  <ListItemAvatar>
                    <Box position="relative">
                      <Avatar src={otherParticipant?.avatar}>
                        {chat.isGroup
                          ? chat.groupName?.charAt(0) || "G"
                          : otherParticipant?.username.charAt(0) || "U"}
                      </Avatar>
                      {online && (
                        <Box
                          position="absolute"
                          bottom={0}
                          right={0}
                          width={10}
                          height={10}
                          bgcolor="green"
                          border="2px solid white"
                          borderRadius="50%"
                        />
                      )}
                    </Box>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between">
                        <Typography fontWeight={500} noWrap>
                          {getChatName(chat)}
                        </Typography>
                        {chat.lastMessage && (
                          <Typography
                            variant="caption"
                            color="textSecondary"
                          >
                            {new Date(chat.lastMessage.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Typography>
                        )}
                      </Box>
                    }
                    secondary={
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          noWrap
                          sx={{ maxWidth: 180 }}
                        >
                          {getLastMessagePreview(chat)}
                        </Typography>
                        {chat.unreadCount > 0 && (
                          <Badge
                            color="primary"
                            badgeContent={chat.unreadCount}
                          />
                        )}
                      </Box>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        )}
      </Box>

      <Divider />

      
    </Box>
  );
};

export default ChatSidebar;
