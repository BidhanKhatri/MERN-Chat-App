import React, { useState } from "react";
import useChatStore from "../store/chatStore";
import { FaArrowUp } from "react-icons/fa";

const ProfilePopup = ({ togglePopup, currentProfilePic }) => {
  const { updateProfile, isUpdatingProfile } = useChatStore();

  const [uploadingImage, setUploadingImage] = useState(null);

  const handleFileChange = (e) => {
    const { files } = e.target;

    const file = files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size should be less than 2MB");
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setUploadingImage(base64Image);
    };
  };
  const updatePic = async (e) => {
    try {
      e.preventDefault();
      await updateProfile({ profilePic: uploadingImage });
      togglePopup();
    } catch (error) {
      console.error("Failed to update profile picture:", error);
      alert(
        "An error occurred while updating your profile picture. Please try again."
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center	">
      <form className="bg-white/60 p-4 rounded-md relative w-full max-w-md backdrop-blur-md">
        <span
          onClick={togglePopup}
          className="absolute top-2 right-4 cursor-pointer font-bold text-2xl select-none "
        >
          &times;
        </span>
        <p className="text-xl font-semibold text-neutral-700 text-center mb-4">
          Update Profile Picture
        </p>

        <div className="flex items-center justify-center flex-col">
          <label htmlFor="profilepic">
            <div className="size-24  rounded-full ring-2 ring-neutral-500 hover:ring-purple-500  cursor-pointer bg-white/20 ">
              <img
                src={uploadingImage || currentProfilePic}
                alt="Click here to upload"
                className="w-full h-full flex items-center justify-center  text-neutral-300 text-center text-xs object-scale-down p-2"
              />
            </div>
          </label>

          <input
            onChange={handleFileChange}
            type="file"
            id="profilepic"
            hidden
          />

          <p className="text-sm text-neutral-700 mt-2 flex items-center gap-2">
            Click here to select new profile picture <FaArrowUp />
          </p>

          <div>
            <button
              onClick={updatePic}
              className="bg-purple-500 text-white px-6 py-2 mt-4 rounded-md hover:bg-purple-600 cursor-pointer"
            >
              {isUpdatingProfile ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfilePopup;
