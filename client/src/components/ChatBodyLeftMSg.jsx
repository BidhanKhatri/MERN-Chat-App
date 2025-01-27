import React from "react";

const ChatBodyLeftMsg = ({ message }) => {
  return (
    <div className="flex gap-4 items-center mb-4">
      {/* Profile Picture */}
      <img
        src={message?.profilePic || "/default-avatar.png"} // Fallback profile pic
        alt="Profile"
        className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
      />

      {/* Message Content */}
      <div className="min-w-32 min-h-10 max-w-80 bg-slate-950 text-neutral-300 px-4 py-2 rounded-lg break-words">
        {message?.text || "No message content"} {/* Fallback message text */}
      </div>
    </div>
  );
};

export default ChatBodyLeftMsg;
