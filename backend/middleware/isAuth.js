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
            return res.status(401).json({
                message: "user does not have token!"
            })
        }

        let verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!verifyToken) {
            return res.status(401).json({
                message: "user does not have a valid token."
            })
        }
        req.userId = verifyToken.id;
        next()
    } catch (error) {
        console.error('message', error)
        return res.status(500).json({ message: `isAuth error ${error}` })
    }
}