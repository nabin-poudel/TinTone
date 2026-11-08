const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Mongo Db connected")
    } catch (err) {
        console.log(err)
        throw new err
    }
}

module.exports = connectDb;