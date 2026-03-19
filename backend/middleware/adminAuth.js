import jwt from 'jsonwebtoken';


const adminAuth = async (req, res, next) => {
    try {
        let token = req.cookies.token;

        // Check for token in Authorization header if not in cookies (mobile support)
        if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: "Not Authorized, Login Again!" });
        }

        let verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!verifyToken) {
            return res.status(401).json({ message: "Not Authorized, Invailid token, Login Again" });
        }

        req.adminEmail = process.env.ADMIN_EMAIL;
        next();
    } catch (error) {
        console.log('adminAuth error');
        return res.status(500).json({ message: `adminAuth error ${error}` })
    }
}

export default adminAuth;