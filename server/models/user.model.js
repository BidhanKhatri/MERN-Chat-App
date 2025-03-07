import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      require: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("User", userSchema);
export default UserModel;
