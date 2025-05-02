import React, { useState, useRef } from "react";
import { Send, Paperclip, Image as ImageIcon } from "lucide-react";
import { useChat } from "../../contexts/ChatContext";
import { toast } from "sonner";
import {
  Button,
  IconButton,
  TextField,
  Box,
  Typography,
} from "@mui/material";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { activeChat, sendMessage, setTyping } = useChat();
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const handleTyping = (text) => {
    setMessage(text);

    if (!isTyping) {
      setIsTyping(true);
      setTyping(true);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      setTyping(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim() && !selectedImage) return;

    sendMessage(message, selectedImage || undefined);
    setMessage("");
    setSelectedImage(null);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    setIsTyping(false);
    setTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are supported");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size too large (max 5MB)");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    e.target.value = "";
  };

  const removeSelectedImage = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
      setSelectedImage(null);
    }
  };

  if (!activeChat) {
    return (
      <Box p={2} borderTop="1px solid #ccc" textAlign="center">
        <Typography color="text.secondary">Select a chat to start messaging</Typography>
      </Box>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {selectedImage && (
        <Box position="relative" mb={1} width={120}>
          <img
            src={selectedImage}
            alt="Selected"
            style={{ height: 96, borderRadius: 8, objectFit: "cover" }}
          />
          <IconButton
            size="small"
            style={{
              position: "absolute",
              top: 4,
              right: 4,
              backgroundColor: "#f44336",
              color: "#fff",
              width: 24,
              height: 24,
            }}
            onClick={removeSelectedImage}
          >
            ×
          </IconButton>
        </Box>
      )}

      <Box display="flex" alignItems="flex-end" gap={1} p={2} borderTop="1px solid #ccc">
        <TextField
          multiline
          fullWidth
          placeholder="Type a message..."
          value={message}
          onChange={(e) => handleTyping(e.target.value)}
          onKeyDown={handleKeyDown}
          minRows={2}
          maxRows={4}
          variant="outlined"
        />

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileChange}
        />

        <IconButton onClick={handleFileUpload}>
          <ImageIcon size={20} />
        </IconButton>

        <IconButton
          type="submit"
          color="primary"
          disabled={!message.trim() && !selectedImage}
        >
          <Send size={20} />
        </IconButton>
      </Box>
    </form>
  );
};

export default MessageInput;
