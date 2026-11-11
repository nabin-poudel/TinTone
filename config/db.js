const mongoose = require('mongoose');
const debug = require('debug')('development:db')

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        debug("Mongo Db connected")
    } catch (err) {
        debug(err)
        throw new err
    }
}

module.exports = connectDb;