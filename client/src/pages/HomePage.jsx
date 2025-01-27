import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import useChatStore from "../store/chatStore";
import DefaultPP from "../assets/images/defaultPP.jpg";
import ChatHeader from "../components/ChatHeader";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";

const HomePage = () => {
  const { getLeftSideMsg, leftSideMsgData, setSelectedUser, selectedUser } =
    useChatStore();
  const [leftData, setLeftData] = useState([]);
  // console.log("leftData", leftData);
  // console.log("selected user", selectedUser);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getLeftSideMsg();
      setLeftData(res);
    };

    fetchData();
  }, []);
  return (
    <section className="flex">
      {/* leftside bar */}
      <div className="w-72  flex-none min-h-[calc(100vh-64px)]  overflow-hidden">
        <div className="p-6">
          {/* serchbar section */}
          <div className="group">
            <div className="w-full bg flex items-center px-2 rounded-md gap-2  ">
              <FaSearch
                size={20}
                className="text-neutral-300 group-focus-within:text-purple-300"
              />
              <input
                type="search"
                className=" w-full p-2 rounded-md outline-none text-neutral-300 placeholder:text-neutral-300"
                placeholder="search users"
              />
            </div>
          </div>

          {/* user chat history display section */}
          <div className="my-2   overflow-y-scroll max-h-[calc(100vh-150px)] ">
            {leftData && leftData.length > 0 ? (
              leftData.map((items, index) => (
                <div
                  key={items._id}
                  onClick={() => setSelectedUser(items)}
                  className="flex items-center gap-4 p-2  hover:bg-neutral-800 cursor-pointer mt-2"
                >
                  {/* User Profile Image */}
                  <img
                    src={items.profilePic || DefaultPP}
                    alt={`${items.fullName} profile`}
                    className="w-12 h-12 rounded-full object-cover bg-neutral-300"
                  />

                  {/* User Info */}
                  <div>
                    <p className="text-white font-medium">{items.fullName}</p>
                    <p className="text-neutral-400 text-sm truncate">
                      {"message"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <>
                <p className="text-white">No chat to display</p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex grow ">
        {/* when there is no selected chats */}
        {!selectedUser && (
          <div className="flex flex-col min-h-[70vh] items-center justify-center w-full gap-4">
            <FaRegMessage
              size={56}
              className="animate-bounce text-neutral-400"
            />
            <p className="font-semibold text-3xl text-neutral-400">
              Welcome to Chat App!
            </p>
            <p className="text-neutral-400">
              Select a user to start a conversation
            </p>
          </div>
        )}

        {/* when there is a selected chat */}
        {selectedUser && (
          <div className="flex flex-col w-full  max-h-[calc(100vh-80px)] px-6 ">
            <ChatHeader />
            <ChatBody />
            <ChatFooter />
          </div>
        )}
      </div>
    </section>
  );
};

export default HomePage;
