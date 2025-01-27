import React, { useEffect } from "react";
import ChatBodyLeftMSg from "./ChatBodyLeftMSg";
import useChatStore from "../store/chatStore";
import ChatBodyRightMsg from "./ChatBodyRightMsg";

const ChatBody = () => {
  const { userId, messages, getMessage, selectedUser } = useChatStore();

  // Debugging Logs
  console.log("Sender ID:", userId); // Ensure userId is defined
  console.log("Messages:", messages); // Ensure messages array is populated
  console.log("Receiver ID:", selectedUser?._id); // Ensure selectedUser is defined

  // Fetch messages when the selected user changes
  useEffect(() => {
    if (selectedUser && selectedUser._id) {
      const fetchMessages = async () => {
        await getMessage(selectedUser._id); // Fetch messages for the selected user
      };

      fetchMessages();
    }
  }, [selectedUser, getMessage]);

  // Render UI
  return (
    <div className="flex flex-col gap-2 grow overflow-y-scroll overflow-x-hidden scroll-smooth my-4">
      {messages && messages.length > 0 ? (
        // Map through messages and render conditionally based on senderId
        messages.map((msg) =>
          msg.senderId === userId ? (
            <ChatBodyRightMsg key={msg._id} message={msg} /> // Right-aligned message
          ) : (
            <ChatBodyLeftMSg key={msg._id} message={msg} /> // Left-aligned message
          )
        )
      ) : (
        // Fallback UI if no messages exist
        <p className="text-center text-gray-500">No messages to display</p>
      )}
    </div>
  );
};

export default ChatBody;
