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

console.log("🔥 CORS middleware LOADED");

// ⭐ FINAL WORKING CORS MIDDLEWARE (Only this — no cors())
const allowedOrigins = [
  "https://onemart-ecom.onrender.com",
  "https://onemart-admindashboard.onrender.com",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://172.16.5.169:5173", // Added for local mobile testing
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  // Debug logging
  if (req.method !== 'OPTIONS') {
    // console.log(`[DEBUG] ${req.method} ${req.url} - Origin: ${origin}`);
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  // Important for preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});


// Health check — visit /health to confirm server is live
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Backend is running!", timestamp: new Date().toISOString() });
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

// Final error handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler Catch:", err.message);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});
