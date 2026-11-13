const jwt = require('jsonwebtoken');
const debug = require('debug')('development:authMiddleware')

// Artist Auth middleware
const authArtist = async (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({ message: "Please login First" })
    }

    // Decoding JWT role token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Checking JWT role token
        if(decoded.role !== "artist") {
            return res.status(403).json({
                message: "You don't have access to do this activity"
            })
        }

        req.user = decoded;

        next();

    } catch (err) {
        debug(err)
        res.status(403).json({
            message: "You don't have access to do this activity"
        })
    }
}

// Get Music + Album Auth
const authUser = async (req, res, next) => {
    const token = req.cookies.token;

    if(!token) return res.status(403).json({ message: "Please Login First to Get Music (!token)" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if(decoded.role !== "user" && decoded.role !== "artist") {
            return res.status(403).json({ message: "Please Login First To Get Music (Role miss match)" })
        }

        req.user = decoded

        next();

    } catch (err) {
        debug(err)
        return res.status(403).json({ message: "Please Login First to Get Music (err)" });
    }

}

module.exports = { authArtist, authUser }