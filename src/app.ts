import express from 'express';
import './database/connection';
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// User Routes
import userRoutes from "./routes/userRoutes";
app.use("/api/auth", userRoutes)

// Category Routes
import categoryRoutes from "./routes/categoryRoutes"
app.use("", categoryRoutes)

// Product Routes
import productRoutes from "./routes/productRoutes"
app.use("", productRoutes)

// Order Routes
import orderRoutes from "./routes/orderRoutes"
app.use("", orderRoutes)

export default app;