import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { generateToken, genTokenAdmin } from "../config/token.js";
import dotenv from "dotenv";
dotenv.config();




export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ msg: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.status(400).json({ msg: "Password should not be less then 8 char" });
        }
        // Check for existing user
        await User.findOne({ email }).then((user) => {
            if (user) return res.status(400).json({ msg: "User already exists" });
        });
        
        const hashPassword = await bcrypt.hash(password, 8);
        const newUser = new User({
            name,
            email,
            password: hashPassword,
        });
        await newUser.save();
        const token = generateToken(newUser._id);
        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: "none",
        //     maxAge: 24 * 60 * 60 * 1000, // 1 day
        // })
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,          // REQUIRED on HTTPS
            sameSite: "none",      // REQUIRED for cross-domain
            path: "/",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            msg: "User registered successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            }
        });
        
    }
    catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validation
        if (!email || !password) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ msg: "Please enter a valid email" });
        }
        // Check for existing user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        const token = generateToken(user._id);
        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: "none",
        //     maxAge: 24 * 60 * 60 * 1000,
        // });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,          // REQUIRED on HTTPS
            sameSite: "none",      // REQUIRED for cross-domain
            path: "/",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            msg: "User logged in successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}


export const logout = (req, res) => {
    try {
        // 1️⃣ Clear cookie with SAME SETTINGS as login
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
        });

        // 2️⃣ Force Chrome to immediately delete cookie
        res.setHeader(
            "Set-Cookie",
            "token=; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=0"
        );
        return res.status(200).json({ msg: "User logged out successfully" });
    } catch (error) {
        console.log('logout error')
        return res.status(500).json({ msg: error.message });
    }
}

// google login controller
export const googleLogin = async (req, res) => {
    try {
        let { name, email } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                name, email
            })
        }
        const token = generateToken(user._id);
        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: "none",
        //     maxAge: 24 * 60 * 60 * 1000,
        // });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,          // REQUIRED on HTTPS
            sameSite: "none",      // REQUIRED for cross-domain
            path: "/",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            msg: "User logged in successfully"
        });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

//admin login controller
export const adminLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        if(email === process.env.ADMIN_EMAIL
            && password === process.env.ADMIN_PASSWORD){
    
            const token = genTokenAdmin(email);
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,          // REQUIRED on HTTPS
                sameSite: "none",      // REQUIRED for cross-domain
                path: "/",
                maxAge: 24 * 60 * 60 * 1000
            });
            return res.status(200).json({
                msg: "User logged in successfully"
            });
        }
        return res.status(400).json({message:"invalid Credentials"})

    } catch (error) {
        console.log("Admin Login error")
        return res.status(500).json({ msg: error.message });
    }
}