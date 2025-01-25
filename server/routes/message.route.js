import { Router } from "express";
import {
  getMessageController,
  leftSideBarMsgController,
  sendMessageController,
} from "../controllers/message.controller.js";
import { authMiddleWare } from "../middlewares/auth.middleware.js";

const messageRoute = Router();

messageRoute.get(
  "/left-side-bar-msg",
  authMiddleWare,
  leftSideBarMsgController
);

messageRoute.get("/:id", authMiddleWare, getMessageController);
messageRoute.post("/send/:id", authMiddleWare, sendMessageController);

export default messageRoute;
