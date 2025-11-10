import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config();


const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//user
export const PlaceOrder  = async (req, res) => {
    
    try {
        const { items, amount, address } = req.body;
        const userId = req.userId;
        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new Order(orderData);
        await newOrder.save();

        await User.findByIdAndUpdate(userId, { cartData: {} });
        return res.status(201).json({ message: "Order placed successfully" });
    } catch (error) {
        console.log("Place order error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const placeOrderRazorpay = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.userId;
        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        }
        const newOrder = new Order(orderData);
        await newOrder.save();

        const options = {
            amount: amount * 100,  // amount in the smallest currency unit
            currency: 'INR',
            receipt: newOrder._id.toString()
        };
        await razorpayInstance.orders.create(options, (err, order) => {
            if (err) {
                console.log("Razorpay order creation error:", err);
                return res.status(500).json({ message: "Razorpay order creation failed", err });
            }
            res.status(200).json(order);
        });
    } catch (error) {
        console.log("Place order error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const verifyRazorpay = async (req, res) => {
    try {
        const userId = req.userId;
        const { razorpay_order_id } = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if(orderInfo.status === 'paid'){
            await Order.findByIdAndUpdate(orderInfo.receipt, { payment: true });
            await User.findByIdAndUpdate(userId, { cartData:{}});
            res.status(200).json({ message: 'Payment Successful'});
        }  else {
            res.status(400).json({ message: 'Payment failed'});
        }  
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const UserOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        return res.status(200).json(orders);
    } catch (error) {
        console.log("Fetch user orders error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


//admin

export const AllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.log("Fetch all orders error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const UpdateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await Order.findByIdAndUpdate(orderId, { status });
        res.status(200).json({ message: "Order status updated successfully" });
    } catch (error) {
        console.log("Update order status error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}