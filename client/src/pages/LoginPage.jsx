import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaEyeSlash,
  FaRegEye,
  FaHandPaper,
} from "react-icons/fa";
import Lottie from "lottie-react";
import LoginAnimationData from "../assets/animations/login-ani.json";
import useChatStore from "../store/chatStore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useChatStore();
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const isAllFields = Object.values(data).every((el) => el !== "");

  const handleForChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const togglePassword = () => {
    setIsPasswordShow(!isPasswordShow);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(data);
    navigate("/");
    setData({ email: "", password: "" });
  };

  return (
    <div className="grid grid-cols-2 place-items-center min-h-[90vh] ">
      <div className="p-8 rounded-lg  w-full max-w-lg ">
        <div className="text-2xl  bg-gradient-to-r from-purple-400 to-pink-400 mb-10 flex items-center gap-4 tracking-wider w-fit bg-clip-text text-transparent font-semibold">
          <FaHandPaper className="text-neutral-200 " />
          Hey! Login to Chat App
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="flex items-center border rounded-md border-gray-300/50 p-3">
            <FaEnvelope className="text-neutral-200 mr-3" />
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 outline-none bg-transparent text-neutral-200 placeholder-neutral-200"
              name="email"
              value={data.email}
              onChange={handleForChange}
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-md border-gray-300/50 p-3">
            <FaLock className="text-neutral-200 mr-3" />
            <input
              type={isPasswordShow ? "text" : "password"}
              placeholder="Password"
              className="flex-1 outline-none bg-transparent text-neutral-200 placeholder-neutral-200"
              name="password"
              value={data.password}
              onChange={handleForChange}
            />

            {isPasswordShow ? (
              <FaRegEye
                onClick={togglePassword}
                className="text-neutral-200 cursor-pointer"
              />
            ) : (
              <FaEyeSlash
                className="text-neutral-200 cursor-pointer"
                onClick={togglePassword}
              />
            )}
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={!isAllFields}
            className={` ${
              isAllFields
                ? "bg-purple-500 hover:bg-purple-600 cursor-pointer"
                : "bg-gray-500 cursor-not-allowed"
            } w-full  text-white py-2 rounded-lg  transition duration-300 `}
          >
            Login <FaArrowRight className="inline ml-2" />
          </button>
        </form>

        {/* Already have an account */}
        <p className="mt-4 text-center text-neutral-200">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-purple-300 hover:underline">
            Signup
          </Link>
        </p>
      </div>
      <div className=" rounded-lg shadow-xl w-full max-w-xl ">
        <div className="">
          <Lottie
            animationData={LoginAnimationData}
            loop={true}
            autoplay={true}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
