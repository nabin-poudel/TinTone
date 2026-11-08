require('dotenv').config();
const app = require('./src/app');
const connectDb = require('./config/db')

connectDb();

app.listen(process.env.PORT, () => console.log(`Server started at ${process.env.PORT}`))