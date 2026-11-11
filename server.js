require('dotenv').config();
const app = require('./src/app');
const connectDb = require('./config/db')
const debug = require('debug')('development:server');

connectDb();

app.listen(process.env.PORT, () => debug(`Server started at ${process.env.PORT}`))