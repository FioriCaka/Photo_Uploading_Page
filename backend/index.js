import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import pinRouter from "./routes/pin.route.js";
import commentRouter from "./routes/comment.route.js";
import boardRouter from "./routes/board.route.js";
import connectDB from "./utils/connectDB.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());
// CORS: explicitly allow the Vite dev origin and credentials + common headers/methods
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);
app.use(cookieParser());
app.use(fileUpload());

app.use("/users", userRouter);
app.use("/pins", pinRouter);
app.use("/comments", commentRouter);
app.use("/boards", boardRouter);

app.use((error, req, res, next) => {
	res.status(error.status || 500);

	res.json({
		message: error.message || "Something went wrong!",
		status: error.status,
		stack: error.stack,
	});
});

app.listen(3000, () => {
	connectDB();
	console.log("Server is running!");
});
