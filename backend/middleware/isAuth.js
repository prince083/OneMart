import jwt from 'jsonwebtoken';


export const isAuth = async (req, res, next) => {
    try {
        let {token} = req.cookies;

        if(!token){
            return res.status(400).json({
                message:"user does not have token!"
            })
        }
        let verifyToken = jwt.verify(token,process.env.JWT_SECRET)
        if(!verifyToken){
            return res.status(400).json({
                message:"user does not have a valid token."
            })
        }
        req.userId = verifyToken.id;
        next()
    } catch (error) {
        console.error('message', error)
        return res.status(500).json({message:`isAuth error ${error}`})
    }
}