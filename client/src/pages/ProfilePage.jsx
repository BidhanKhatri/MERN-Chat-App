import React, { useCallback, useState } from "react";
import { FaArrowUp, FaCamera, FaEnvelope, FaUser } from "react-icons/fa";
import useChatStore from "../store/chatStore";
import DefaultPP from "../assets/images/defaultPP.jpg";
import ProfilePopup from "../components/ProfilePopup";

const ProfilePage = () => {
  const { userName, userEmail, userProfilePic, userCreatedDate } =
    useChatStore();
  const [isProfilePopUpOpen, setIsProfilePopUpOpen] = useState(false);
  console.log("my pic", userProfilePic);

  const toggleProfilePopUp = useCallback(() => {
    setIsProfilePopUpOpen(!isProfilePopUpOpen);
  }, [isProfilePopUpOpen]);

  console.log(isProfilePopUpOpen);

  return (
    <section>
      <div className="w-20 bg-slate-950  min-w-lg max-w-2xl  mx-auto mt-10 rounded-md shadow-sm  p-6">
        <div>
          <p className="text-2xl font-bold text-neutral-400 text-center mb-2">
            Profile
          </p>
          <p className="text-sm text-neutral-400 text-center mb-6">
            Your profile information
          </p>
        </div>
        <div className="flex items-center justify-center flex-col ">
          <div
            onClick={toggleProfilePopUp}
            className="h-20 w-20 bg-gray-400/20 text-neutral-400 rounded-full  ring-2 ring-neutral-500 cursor-pointer  overflow-hidden"
          >
            <img
              src={userProfilePic || DefaultPP}
              alt="profile"
              className="w-full h-full rounded-md flex items-center justify-center "
            />
          </div>
          <div>
            <p className="text-sm text-neutral-400 mt-2 flex items-center gap-2">
              Click here to update profile picture <FaArrowUp />
            </p>
          </div>
        </div>

        <form className="space-y-6 mt-8">
          {/* FullName */}

          <div className="flex items-center border rounded-md border-neutral-500 p-3">
            <FaUser className="text-neutral-400 mr-3" />
            <input
              type="fullName"
              placeholder="Full Name"
              className="flex-1 outline-none bg-transparent text-neutral-400 placeholder-neutral-400"
              name="text"
              value={userName}
              readOnly
            />
          </div>

          {/* Email */}
          <div className="flex items-center border rounded-md border-neutral-500 p-3">
            <FaEnvelope className="text-neutral-400 mr-3" />
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 outline-none bg-transparent text-neutral-400 placeholder-neutral-400"
              name="email"
              value={userEmail}
              readOnly
            />
          </div>
        </form>
      </div>
      <div className="w-20 bg-slate-950  min-w-lg max-w-2xl  mx-auto mt-2 rounded-md shadow-sm  p-6">
        <div className=" flex items-center justify-between">
          <p className="text-neutral-400 "> Member Since</p>
          <p className="text-neutral-400 ">
            {new Date(userCreatedDate)
              .toISOString()
              .split("T")[0]
              .replaceAll("-", "/")}
          </p>
        </div>
        <div className=" flex items-center justify-between">
          <p className="text-neutral-400 ">User Status</p>
          <p className=" mt-4 text-lime-500 tracking-wider ">Active</p>
        </div>
      </div>

      {isProfilePopUpOpen && (
        <ProfilePopup
          togglePopup={toggleProfilePopUp}
          currentProfilePic={userProfilePic}
        />
      )}
    </section>
  );
};

export default ProfilePage;
