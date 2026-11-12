const musicModel = require('../models/musicModel');
const { uploadMusicFile } = require('../services/storageService');
const albumModel = require('../models/albumModel');
const debug = require('debug')('development:musicController')

// Music Creation Function
const createMusic = async (req, res) => {
    try {
        // Creating Music
        const { title } = req.body;
        const file = req.file;
        const result = await uploadMusicFile(file.buffer.toString("base64"));

        const music = await musicModel.create({
            uri: result.url,
            title: title,
            artist: req.user.id
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
};

// Creating Music Album
const createAlbum = async (req, res) => {
    try {
        // Creating Album
        const { title, musicIds } = req.body;
        const album = await albumModel.create({
            title,
            belongingArtist: req.user.id,
            musics: musicIds
        })
        
        // Sending Response
        res.status(201).json({
            message: "Album Created successfully",
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics
            }
        })
    } catch (err) {
        debug(`Error ${err}`)
        return res.status(401).json({ message: "Unauthorized" })
    }
};

module.exports = { createMusic, createAlbum }