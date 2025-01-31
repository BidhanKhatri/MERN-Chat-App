import React, { useEffect, useRef } from "react";
import ChatBodyLeftMSg from "./ChatBodyLeftMSg";
import useChatStore from "../store/chatStore";
import ChatBodyRightMsg from "./ChatBodyRightMsg";
import { get } from "mongoose";

const ChatBody = () => {
  const {
    userId,
    messages,
    getMessage,
    selectedUser,
    getRealTimeMessage,
    removeRealTimeMessage,
  } = useChatStore();

  const scrollRef = useRef(null);

  // Debugging Logs
  console.log("Sender ID:", userId); // Ensure userId is defined
  console.log("Messages:", messages); // Ensure messages array is populated
  console.log("Receiver ID:", selectedUser?._id); // Ensure selectedUser is defined

  // Fetch messages when the selected user changes
  useEffect(() => {
    if (selectedUser && selectedUser._id) {
      const fetchMessages = async () => {
        await getMessage(selectedUser._id); // Fetch messages for the selected user
        getRealTimeMessage();
      };

      fetchMessages();

      return () => removeRealTimeMessage();
    }
  }, [selectedUser._id, getMessage, getRealTimeMessage, removeRealTimeMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Render UI
  return (
    <div className="flex flex-col gap-2 grow overflow-y-scroll overflow-x-hidden scroll-smooth my-4">
      {messages && messages.length > 0 ? (
        messages.map((msg, index) => {
          const isLastMessage = index === messages.length - 1; // Check if it's the last message
          return msg.senderId === userId ? (
            <ChatBodyRightMsg
              key={msg._id}
              message={msg}
              ref={isLastMessage ? scrollRef : null} // Only set ref on last message
            />
          ) : (
            <ChatBodyLeftMSg
              key={msg._id}
              message={msg}
              ref={isLastMessage ? scrollRef : null} // Only set ref on last message
            />
          );
        })
      ) : (
        <p className="text-center text-gray-500">No messages to display</p>
      )}
    </div>
  );
};

export default ChatBody;
