import React from "react";
import { Link } from "react-router-dom";
import useChatStore from "../store/chatStore";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { logout, authUser } = useChatStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 px-20 py-4 text-gray-300 flex justify-between items-center shadow-md shadow-white/10">
      <Link to={"/"}>
        <p className="text-3xl font-bold">Chat App</p>
      </Link>

      <div className="flex  gap-4 items-center">
        <span className="">
          <Link
            to={"/settings"}
            className="bg-slate-700 px-4 py-2 cursor-pointer"
          >
            Setting
          </Link>
        </span>
        {authUser && (
          <>
            <span className="">
              <Link
                to={"/profile"}
                className="bg-slate-700 px-4 py-2 cursor-pointer"
              >
                Profile
              </Link>
            </span>
            <span className="">
              <button
                onClick={handleLogout}
                className=" px-4 py-2 cursor-pointer"
              >
                Logout
              </button>
            </span>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
