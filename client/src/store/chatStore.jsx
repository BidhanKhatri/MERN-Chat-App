import { create, useStore } from "zustand";
import axiosInstance from "../utils/axiosInstace";
import { toast } from "react-toastify";
import { disconnect } from "mongoose";
const BaseUrl = "http://localhost:5000";
import { io } from "socket.io-client";

const useChatStore = create((set, get) => ({
  authUser: null,
  isAuthChecking: true,
  isLogin: false,
  isSignup: false,
  isUpdatingProfile: false,
  isGettingLeftSideMsg: false,
  userName: null,
  userEmail: null,
  userId: "",
  userProfilePic: null,
  userCreatedDate: null,
  leftSideMsgData: [],
  selectedUser: null,
  messages: [],
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/authenticate-user");
      if (res.data.success) {
        set({
          authUser: true,
          userName: res.data.data.fullName,
          userEmail: res.data.data.email,
          userCreatedDate: res.data.data.createdAt,
          userProfilePic: res.data.data.profilePic,
          userId: res.data.data._id,
          isAuthChecking: false,
        });
        get().connectSocket();
      } else {
        set({ authUser: null, isAuthChecking: false });
      }
    } catch (error) {
      console.error(error);
      set({ authUser: null, isAuthChecking: false });
    }
  },

  signup: async (data) => {
    try {
      set({ isSignup: true });
      const result = await axiosInstance.post("/auth/signup", data);
      console.log("my res", result);
      if (result.data && result.data.success) {
        set({ authUser: true, isSignup: false });
        toast.success(result.data.msg);
        get().connectSocket();
      } else {
        toast.error(result.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
      set({ isSignup: false });
    } finally {
      set({ isSignup: false });
    }
  },

  login: async (data) => {
    try {
      set({ isLogin: true });

      const res = await axiosInstance.post("/auth/login", data);
      if (res.data && res.data.success) {
        toast.success(res.data.msg);
        set({
          authUser: true,
          isLogin: false,
        });
        get().connectSocket();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
      set({ isLogin: false });
    } finally {
      set({ isLogin: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      if (res.data.success) {
        toast.success(res.data.msg);
        set({ authUser: null });
        get().disconnectSocket();
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      console.log(error);
    }
  },

  updateProfile: async (data) => {
    try {
      set({ isUpdatingProfile: true }); // Start updating
      const res = await axiosInstance.post("/auth/upload-pic", data);

      if (res.data && res.data.success) {
        toast.success(res.data.msg || "Upload Success!");
        set({ userProfilePic: res.data.data.profilePic });
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg || "Something went wrong!");
    } finally {
      set({ isUpdatingProfile: false }); // Reset updating state
    }
  },

  getLeftSideMsg: async () => {
    try {
      set({ isGettingLeftSideMsg: true });
      const res = await axiosInstance.get("/message/left-side-bar-msg");

      if (res.data.sucess && Array.isArray(res.data.data)) {
        set({ leftSideMsgData: res.data.data });
        return res.data.data;
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isGettingLeftSideMsg: false });
    }
  },

  getMessage: async (userId) => {
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      if (res.data && res.data.sucess) {
        set({ messages: res.data.data });
      }
    } catch (error) {
      console.log(error);
    }
  },

  sendMessage: async (chatData, receiverId) => {
    try {
      const payload = {
        text: chatData.text,
        image: chatData.image || null,
      };
      const res = await axiosInstance.post(
        `/message/send/${receiverId}`,
        payload
      );
    } catch (error) {
      console.log(error);
    }
  },

  setSelectedUser: (user) => set({ selectedUser: user }),

  connectSocket: () => {
    const { authUser, userId } = get();
    console.log("User", userId);
    if (!authUser) return;

    const socket = io(BaseUrl, {
      query: {
        userId: userId,
      },
    });
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to server ✅", socket.id);
    });
    socket.on("onlineUserId", (onlineUserId) => {
      set({ onlineUsers: onlineUserId });
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from server ❌");
    });
    set({ socket });
  },
  disconnectSocket: () => {
    const { socket } = get();

    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
  getRealTimeMessage: () => {
    const { socket, setSelectedUser } = get();

    if (!setSelectedUser) return;

    socket.on("newMessage", (newMessage) => {
      set({ messages: [...get().messages, newMessage] });
    });
  },

  removeRealTimeMessage: () => {
    const { socket } = get();
    socket.off("newMessage");
  },
}));

export default useChatStore;
