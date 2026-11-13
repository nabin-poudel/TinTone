const express = require('express');
const router = express.Router();
const musicController = require("../controllers/musicController");
const authMiddleware = require('../middlewares/authMiddleware')
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage()
})

router.post('/uploadMusic', authMiddleware.authArtist, upload.single("music"), musicController.createMusic)
router.post('/createAlbum', authMiddleware.authArtist, musicController.createAlbum);
router.get('/getMusics', authMiddleware.authUser, musicController.getMusics);
router.get('/getAlbum', authMiddleware.authUser, musicController.getAlbum);
router.get('/getAlbum/:AlbumId', authMiddleware.authUser, musicController.getAlbumById);

module.exports = router;