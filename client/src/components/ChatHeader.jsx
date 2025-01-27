import React from "react";
import useChatStore from "../store/chatStore";
import DefaultPP from "../assets/images/defaultPP.jpg";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  return (
    <div className="text-neutral-400 flex  px-4 py-4  relative">
      <div>
        <div className=" flex gap-4 items-center">
          <img
            src={selectedUser.profilePic || DefaultPP}
            alt="profile"
            className="size-12 bg-gray-200 rounded-full flex items-center justify-center text-xs"
          />

          <div className="">
            <p className="font-semibold">{selectedUser.fullName}</p>
            <p className="text-xs">Active {selectedUser._id}</p>
          </div>
        </div>
      </div>
      <span
        onClick={() => setSelectedUser(null)}
        className="absolute text-3xl font-bold right-6 top-1/2 -translate-y-1/2 cursor-pointer select-none"
      >
        &times;
      </span>
    </div>
  );
};

export default ChatHeader;
