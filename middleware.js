const jwt = require('jsonwebtoken');
const { User } = require('./models');

const protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No Token, Authorization Denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        
        if (!req.user || req.user.isDeleted) {
            return res.status(401).json({ message: "User not found or account deactivated" });
        }
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'ADMIN') next();
    else res.status(403).json({ message: "Admin access required" });
};

module.exports = { protect, adminOnly };