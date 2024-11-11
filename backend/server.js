import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDb.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/schedules", scheduleRoutes);

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));