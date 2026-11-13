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

// Get All Musics
const getMusics = async (req, res) => {
    const musics = await musicModel.find().limit(3).populate("artist", "username email");

    res.status(200).json({
        message: "Musics Fetched successfully",
        music: musics
    })
}

// Get All Album
const getAlbum = async (req, res) => {
    const album = await albumModel.findOne().select("title belongingArtist").populate("belongingArtist", "username email");

    res.status(200).json({
        message: "Album Fetched Successfully",
        album: album
    })
}

// Get Album By Id
const getAlbumById = async (req, res) => {
    const albumId = req.body.params
    const album = await albumModel.findById(albumId).populate("belongingArtist", "username email");

    res.status(200).json({
        message: `${albumId} Album fetched`,
        album
    })
}

// Get Music By Id
const getMusicById = async (req, res) => {
    const musicId = req.params
    const music = await musicModel.findById(musicId).populate("belongingArtist", "username email");

    if(!music) return res.status(300).json({
        message: "No Music Found",
    })

    res.status(200).json({
        message: `${music} Music fetched`,
        music
    })
};

// Delete Music 
const deleteMusic = async (req, res) => {
    const musicId = req.params.musicId;
    debug(musicId);

    const music = await musicModel.findById(musicId);
    if(!music) {
        return res.status(404).json({
            message: "Music Doesn't exist to delete",
        })
    }

    const deletedMusic = await musicModel.findByIdAndDelete(musicId);

    res.status(200).json({
        message: "Music Deleted Successfully",
        deletedMusic
    })
}

module.exports = { createMusic, createAlbum, getMusics, getAlbum, getAlbumById, getMusicById, deleteMusic }