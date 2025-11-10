import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (id) => {
    try {
        const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: "1d" })
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw error;
    }
};


export const genTokenAdmin = (email) => {
    try {
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1d" })
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw error;
    }
};