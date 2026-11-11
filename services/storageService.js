const { ImageKit } = require('@imagekit/nodejs');

const imageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,

})

const uploadMusicFile = async (file) => {
    const result = await imageKitClient.files.upload({
        file,
        fileName: "music_" + Date.now(),
        folder: process.env.IMAGEKIT_FOLDER_NAME
    })
    return result;
}

module.exports = { uploadMusicFile }