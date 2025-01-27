import React from "react";
import { Link } from "react-router-dom";
import useChatStore from "../store/chatStore";
import { useNavigate } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
const Navbar = () => {
  const { logout, authUser } = useChatStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-950 px-16 py-4 text-gray-300 flex justify-between items-center shadow-md border-b border-neutral-700">
      <Link to={"/"}>
        <p className="text-2xl font-bold">Chat App</p>
      </Link>

      <div className="flex  gap-6 items-center ">
        <span className="group">
          <Link to={"/settings"}>
            <CiSettings size={24} className=" cursor-pointer  " />
          </Link>
        </span>
        {authUser && (
          <div className="flex items-center gap-2 relative">
            <span className="group">
              <Link to={"/profile"}>
                <FaUser size={20} className=" cursor-pointer" />
              </Link>
              <p className="absolute bg-gray-700 text-sm px-2 py-1 rounded-md hidden group-hover:block">
                Profile
              </p>
            </span>
            <span className="group">
              <button
                onClick={handleLogout}
                className=" px-4 py-2 cursor-pointer"
              >
                <IoExitOutline size={20} className=" cursor-pointer" />
              </button>
              <p className="absolute bg-gray-700 text-sm px-2 py-1 rounded-md hidden group-hover:block">
                Logout
              </p>
            </span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
