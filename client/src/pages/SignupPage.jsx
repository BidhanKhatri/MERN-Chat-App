import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaEyeSlash,
  FaRegEye,
} from "react-icons/fa";
import Lottie from "lottie-react";
import animationData from "../assets/animations/signup-ani.json";
import useChatStore from "../store/chatStore";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const { signup } = useChatStore();

  const [data, setData] = useState({
    fullName: "",
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
    signup(data);
    setData({ fullName: "", email: "", password: "" });
  };

  return (
    <div className="grid grid-cols-2 place-items-center min-h-[90vh] ">
      <div className="p-8 rounded-lg  w-full max-w-lg ">
        <div className="text-2xl  bg-gradient-to-r from-purple-400 to-pink-400 mb-10 flex items-center gap-4 tracking-wider w-fit bg-clip-text text-transparent font-semibold">
          <FaEnvelope className="text-neutral-200 " />
          Hey! Sign Up to Chat App
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="flex items-center border rounded-md border-gray-300/50 p-3">
            <FaUser className="text-neutral-200 mr-3" />
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              className="flex-1 outline-none bg-transparent text-neutral-200 placeholder-neutral-200"
              value={data.fullName}
              onChange={handleForChange}
            />
          </div>

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
            className={`w-full ${
              isAllFields
                ? "bg-purple-500  hover:bg-purple-600 cursor-pointer"
                : "bg-gray-500 cursor-not-allowed "
            }  text-white py-2  rounded-lg transition duration-300 r`}
          >
            Sign Up <FaArrowRight className="inline ml-2" />
          </button>
        </form>

        {/* Already have an account */}
        <p className="mt-4 text-center text-neutral-200">
          Already have an account?{" "}
          <Link to={"/login"} className="text-purple-300 hover:underline">
            Log In
          </Link>
        </p>
      </div>
      <div className=" rounded-lg shadow-xl w-full max-w-xl ">
        <div className="">
          <Lottie animationData={animationData} loop={true} autoplay={true} />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
