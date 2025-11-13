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

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['https://onemart-ecom.vercel.app',
    'http://localhost:5174'
  ], // Update with your frontend URL
  credentials: true,
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});