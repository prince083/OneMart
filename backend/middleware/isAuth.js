import jwt from 'jsonwebtoken';


export const isAuth = async (req, res, next) => {
    try {
        let token = req.cookies.token;

        // Check for token in Authorization header if not in cookies (mobile support)
        if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
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