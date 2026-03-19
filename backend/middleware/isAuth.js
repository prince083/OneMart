import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const isAuth = async (req, res, next) => {
    try {
        let token = req.cookies ? req.cookies.token : null;

        // If no cookie, try the Authorization header (mobile support)
        if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
            // If the header contains "null" or "undefined" string, treat it as no token
            if (token === "null" || token === "undefined") {
                token = null;
            }
        }

        if (!token) {
            console.log("Auth failed: No token provided");
            return res.status(401).json({
                message: "Authentication failed: No token provided."
            })
        }

        try {
            const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = verifyToken.id;
            console.log("Auth success for user:", req.userId);
            next();
        } catch (jwtError) {
            console.error("JWT Verification failed:", jwtError.message);
            return res.status(401).json({
                message: "Authentication failed: Invalid or expired token."
            });
        }
    } catch (error) {
        console.error('isAuth Global Error:', error);
        return res.status(500).json({ message: `Internal Security Error` });
    }
}