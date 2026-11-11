const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const authRoute = require('../routes/authRoute');
const loginRoute = require('../routes/loginRoute')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoute)
app.use('/api/auth', loginRoute)

module.exports = app;