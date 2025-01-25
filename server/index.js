import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.config.js";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//routes
app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

//server connection

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at port ${PORT}`);
});
