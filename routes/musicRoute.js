const express = require('express');
const router = express.Router();
const musicController = require("../controllers/musicController");
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage()
})

router.post('/uploadMusic', upload.single("music"), musicController.createMusic)

module.exports = router;