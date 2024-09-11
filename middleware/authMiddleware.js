const jwt = require('jsonwebtoken');
const jwtSecret = 'your_jwt_secret';

module.exports = function(req, res, next) {
    const token = req.header('authorization');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const actualToken = token.split(' ')[1];

        // Decrypt/Verify the token - assuming JWT here
        const secretKey = process.env.JWT_SECRET?process.env.JWT_SECRET:'mysecretkey'; // Your secret key
        const decodedToken = jwt.verify(actualToken, secretKey);

        req.user = decodedToken.user;

        // Extract accountId from the decrypted token
        const accountId = decodedToken.user.alpaca_account_id;

        if (!accountId) {
            return res.status(400).json({ error: 'Invalid token' });
        }

        // // Attach accountId to the request object
        // req.accountId = accountId;

        // Call the next middleware/route handler
        next();

        // const decoded = jwt.verify(token, jwtSecret);
        // req.user = decoded.user;
        // next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
