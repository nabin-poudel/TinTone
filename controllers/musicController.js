const musicModel = require('../models/musicModel');
const jwt = require('jsonwebtoken');
const { uploadMusicFile } = require('../services/storageService');
const debug = require('debug')('development:musicController')

// Creating Music
const createMusic = async (req, res) => {
    const token = req.cookies.token;

    // Checking User
    if(!token) {
        return res.status(401).json({
            message: "Unauthorized User Found"
        })
    }

    // Decoding JWT role token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded.role !== "artist") {
            return res.status(403).json({
                message: "You don't have access to create music"
            })
        }

        const { title } = req.body;
        const file = req.file;
        const result = await uploadMusicFile(file.buffer.toString("base64"));

        // Creating Music
        const music = await musicModel.create({
            uri: result.uri,
            title: title,
            artist: decoded.id
        })

        // Sending Response
        res.status(201).json({
            message: "Music Created successfully",
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artist: music.artist
            }
        })

    } catch (err) {
        debug(err)
    }
}

module.exports = { createMusic }