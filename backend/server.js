import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/userRoutes.js";
import postRoute from "./routes/postRoutes.js";
import messageRoute from "./routes/messageRoutes.js";
import { app, server } from "./socket/socket.js";

 
dotenv.config();


const PORT = process.env.PORT || 3000;


//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true
}
app.use(cors(corsOptions));

// yha pr apni api ayengi
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);


server.listen(PORT, () => {
    connectDB();
    console.log(`Server listen at port ${PORT}`);
});