import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { app, server } from "./lib/socket.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

import { connectToMongoDB } from "./lib/db.js";

import job from "./cron/cron.js";

dotenv.config();
job.start();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", messageRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.use((req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    connectToMongoDB();
});
