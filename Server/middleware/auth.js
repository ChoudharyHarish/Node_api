import jwt from 'jsonwebtoken';

const authentication = async (req, res, next) => {
    const headers = req.headers.authorization
    if (!headers || !headers.startsWith('Bearer ')) {
       return  res.status(500).json('Authentication invalid');
    }
    const token = headers.split(' ')[1];
    try {
        // If we want to implement with google login then token length will be greater than 500 so handling it.
        if (token.length < 500) {
            // Means it is our custom token 
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = { userId: payload.userId, name: payload.name }
        }
        else {
            // For Google Login
            const payload = jwt.decode(token);
            req.user = { userId: payload.sub, name: payload.name }
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json("Token Expired Please Login Again");
    }
}

export default authentication;