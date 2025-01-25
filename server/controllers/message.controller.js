import MessageModel from "../models/message.model";
import UserModel from "../models/user.model";
import cloudinary from "../utils/cloudinary";

//display all user msg controller (for left side bar)
export const leftSideBarMsgController = async (req, res) => {
  try {
    const userId = req.userId; //getting user id from middleware

    //find a user in a such a way that
    const filteredUser = await UserModel.find({ _id: { $ne: userId } }).select(
      "fullName profilePic"
    );

    return res.status(200).json({
      msg: "Messages fetched successfully",
      data: filteredUser,
      sucess: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || error,
      success: false,
      error: true,
    });
  }
};

//get message controller
export const getMessageController = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const myId = req.userId; //getting user id from middleware

    const msg = await UserModel.find({
      $or: [
        { senderId: myId, receiverId: receiverId },
        { senderId: receiverId, receiverId: myId },
      ],
    });

    return res.status(200).json({
      msg: "Messages fetched successfully",
      data: msg,
      sucess: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || error,
      success: false,
      error: true,
    });
  }
};

//send message controller
export const sendMessageController = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const myId = req.userId; //getting user id from middleware
    const { text, image } = req.body;

    const cloudImageRes = await cloudinary.uploader.upload(image);

    const createMessage = new MessageModel({
      senderId: myId,
      receiverId,
      text,
      image: cloudImageRes.secure_url,
    });

    await createMessage.save();

    return res.status(200).json({
      msg: "Message sent successfully",
      data: createMessage,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || error,
      success: false,
      error: true,
    });
  }
};
