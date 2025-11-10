import express from 'express';
import { isAuth } from '../middleware/isAuth.js';
import { AllOrders, PlaceOrder, placeOrderRazorpay, UpdateStatus, UserOrders, verifyRazorpay } from '../controllers/orderController.js';

const orderRoutes = express.Router();

//user
orderRoutes.post('/placeorder', isAuth, PlaceOrder);
orderRoutes.post('/razorpay', isAuth, placeOrderRazorpay);
orderRoutes.post('/verifyrazorpay', isAuth, verifyRazorpay);
orderRoutes.post('/userorders', isAuth, UserOrders);

//admin
orderRoutes.post('/list', isAuth, AllOrders);
orderRoutes.post('/status', isAuth, UpdateStatus);

export default orderRoutes;