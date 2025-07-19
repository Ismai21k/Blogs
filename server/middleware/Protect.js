const jwt = require('jsonwebtoken')

// Express middleware to protect routes by verifying JWT tokens.
// 1. Extracts the token from the Authorization header (expects "Bearer <token>").
// 2. If no token is found, responds with 401 Unauthorized.
// 3. If a token is present, verifies it using the secret key from environment variables.
// 4. On successful verification, attaches the decoded payload to req.user and calls next().
// 5. If verification fails, responds with 401 and "Invalid token".

const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decode)
        req.user = decode;
        next();
    } catch {
        res.status(401).json({ message:'Invalid token' })
    }
};

module.exports = protect;