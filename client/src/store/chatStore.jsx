import { create } from "zustand";
import axiosInstance from "../utils/axiosInstace";
import { toast } from "react-toastify";
const useChatStore = create((set) => ({
  authUser: null,
  isAuthChecking: true,
  isLogin: false,
  isSignup: false,
  isUpdatingProfile: false,
  userName: null,
  userEmail: null,
  userProfilePic: null,
  userCreatedDate: null,

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
          isAuthChecking: false,
        });
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
}));

export default useChatStore;
