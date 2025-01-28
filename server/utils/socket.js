import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});
//socket configuration
io.on("connection", (socket) => {
  console.log("User Connected to server ✅", socket.id);

  //   console.log("Handshake Query:", socket.handshake.query);

  const userId = socket.handshake.query.userId;
  //   console.log("user ko id", userId);

  socket.on("disconnect", () => {
    console.log("User Disconnected from server ❌", socket.id);
  });
});

export { app, server, io };
