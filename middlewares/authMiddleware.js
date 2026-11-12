const jwt = require('jsonwebtoken');
const debug = require('debug')('development:authMiddleware')

// Artist Authorization middleware
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
                message: "You don't have access to create Album"
            })
        }

        req.user = decoded;

        next();

    } catch (err) {
        debug(err)
        res.status(403).json({
            message: "You don't have access to create album (Catch Part)"
        })
    }
}

module.exports = { authArtist }