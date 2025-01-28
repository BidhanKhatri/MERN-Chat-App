import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.config.js";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import { server, app } from "./utils/socket.js";

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow credentials (cookies, etc.)
  })
);

//routes
app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);



//server connection

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  connectDB();
  console.log(`Server started at port ${PORT}`);
});
