import React, { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { FiSend } from "react-icons/fi";
import useChatStore from "../store/chatStore";

const ChatFooter = () => {
  const [chatData, setChatData] = useState({
    text: "",
    image: null,
  });

  const { selectedUser, sendMessage } = useChatStore();

  //   console.log(chatData);

  const handleInputChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      const file = files[0];
      if (!file) return;

      // Read the file as a base64 string
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result; // This is the base64 string
        setChatData((prev) => ({
          ...prev,
          [name]: base64String, // Save the base64 string in `chatData.image`
        }));
      };
      reader.readAsDataURL(file); // Converts file to base64 string
    } else if (type === "text") {
      setChatData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleMessageSend = (e) => {
    if (e) e.preventDefault();
    sendMessage(chatData, selectedUser._id);
    setChatData({
      text: "",
      image: null,
    });
  };
  return (
    <div className="">
      <div className="px-4 py-1 border border-neutral-500/60 rounded-md min-h-10">
        <div className="flex gap-4 items-center">
          <input
            type="text"
            className=" flex grow rounded-md p-2 placeholder:text-neutral-300 text-neutral-300 outline-none"
            placeholder="Type your message..."
            value={chatData.text}
            name="text"
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleMessageSend(e);
              }
            }}
          />
          <button className="flex-none text-neutral-300">
            <label htmlFor="image">
              <CiImageOn size={26} className="cursor-pointer" />
            </label>
            <input
              onChange={handleInputChange}
              name="image"
              type="file"
              id="image"
              hidden
            />
          </button>
          <button
            onClick={handleMessageSend}
            className="flex-none text-neutral-400"
          >
            <FiSend size={24} className="cursor-pointer hover:text-lime-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatFooter;
