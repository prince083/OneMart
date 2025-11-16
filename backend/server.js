import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const port = process.env.PORT || 8000;
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());


// ⭐ FINAL WORKING CORS MIDDLEWARE (Only this — no cors())
const allowedOrigins = [
  "https://onemart-ecom.onrender.com",        // your main frontend
  "https://onemart-admindashboard.onrender.com", // your admin frontend
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

  // Important for preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);



// server start
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});