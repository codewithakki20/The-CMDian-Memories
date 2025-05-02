import React, { useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useChat } from "../../contexts/ChatContext";
import Avatar from "@mui/material/Avatar";
import { CheckCheck, Clock } from "lucide-react";

const MessageList = () => {
  const { user } = useAuth();
  const { messages, activeChat, typingStatus } = useChat();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const typingUsers = activeChat?.participants.filter(
    (p) => typingStatus[p.id] && p.id !== user?.id
  );

  const groupMessagesByDate = () => {
    const groups = [];

    messages.forEach((message) => {
      const messageDate = new Date(message.timestamp);
      const dateStr = messageDate.toLocaleDateString();

      const existingGroup = groups.find((g) => g.date === dateStr);
      if (existingGroup) {
        existingGroup.messages.push(message);
      } else {
        groups.push({ date: dateStr, messages: [message] });
      }
    });

    return groups;
  };

  const getSenderName = (message) => {
    if (message.senderId === user?.id) return "You";
    const sender = activeChat?.participants.find((p) => p.id === message.senderId);
    return sender?.username || "Unknown User";
  };

  const formatMessageTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "sent":
        return <Clock size={14} style={{ color: "#888" }} />;
      case "delivered":
        return <CheckCheck size={14} style={{ color: "#888" }} />;
      case "read":
        return <CheckCheck size={14} style={{ color: "#3498db" }} />;
      default:
        return null;
    }
  };

  const isOwnMessage = (message) => {
    return message.senderId === user?.id;
  };

  const formatDateSeparator = (dateStr) => {
    const messageDate = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
      return "Today";
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return messageDate.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  };

  const messageGroups = groupMessagesByDate();

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messageGroups.map((group) => (
        <div key={group.date} className="space-y-4">
          <div className="flex justify-center">
            <div className="text-xs font-medium text-muted-foreground bg-background px-2 py-1 rounded">
              {formatDateSeparator(group.date)}
            </div>
          </div>

          {group.messages.map((message, messageIndex) => {
            const isOwn = isOwnMessage(message);
            const showAvatar =
              !isOwn &&
              (messageIndex === 0 ||
                group.messages[messageIndex - 1].senderId !== message.senderId);

            const sender = activeChat?.participants.find(
              (p) => p.id === message.senderId
            );

            return (
              <div
                key={message.id}
                className={`flex ${isOwn ? "justify-end" : "justify-start"} space-x-2`}
              >
                {!isOwn && showAvatar && (
                  <Avatar
                    alt={sender?.username}
                    src={sender?.avatar}
                    sx={{ width: 32, height: 32 }}
                  >
                    {sender?.username?.charAt(0) || "U"}
                  </Avatar>
                )}

                <div className={`flex flex-col ${isOwn ? "items-end" : "items-start"}`}>
                  {showAvatar && !isOwn && (
                    <span className="text-xs text-muted-foreground mb-1">
                      {getSenderName(message)}
                    </span>
                  )}

                  <div
                    className={`message-bubble ${
                      isOwn ? "message-bubble-sent" : "message-bubble-received"
                    } animate-fade-in`}
                  >
                    {message.content}
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Message attachment"
                        className="mt-2 rounded-md max-w-full"
                      />
                    )}
                  </div>

                  <div className="flex items-center mt-1 space-x-1">
                    <span className="text-xs text-muted-foreground">
                      {formatMessageTime(message.timestamp)}
                    </span>
                    {isOwn && <div className="flex items-center">{getStatusIcon(message.status)}</div>}
                    {message.isEdited && (
                      <span className="text-xs text-muted-foreground">(edited)</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {typingUsers && typingUsers.length > 0 && (
        <div className="flex items-center space-x-2 animate-fade-in">
          <Avatar
            alt={typingUsers[0].username}
            src={typingUsers[0].avatar}
            sx={{ width: 24, height: 24 }}
          >
            {typingUsers[0].username.charAt(0)}
          </Avatar>
          <div className="bg-card px-3 py-2 rounded-full">
            <div className="flex space-x-1">
              <div
                className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-dot"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-dot"
                style={{ animationDelay: "300ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-dot"
                style={{ animationDelay: "600ms" }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
