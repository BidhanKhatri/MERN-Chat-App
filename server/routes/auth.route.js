import { Router } from "express";
import {
  authUserController,
  loginController,
  logoutController,
  signupController,
  updateProfileController,
} from "../controllers/auth.controller.js";
import { authMiddleWare } from "../middlewares/auth.middleware.js";

const authRoute = Router();

//signup route
authRoute.post("/signup", signupController);

//login route
authRoute.post("/login", loginController);

// update profile route
authRoute.post("/upload-pic", authMiddleWare, updateProfileController);

//logout route
authRoute.post("/logout", logoutController);

// authenticate route
authRoute.get("/authenticate-user", authMiddleWare, authUserController);

export default authRoute;
