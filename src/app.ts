import express from 'express';
import './database/connection';
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import userRoutes from "./routes/userRoutes";
app.use("/api/auth", userRoutes)

export default app;