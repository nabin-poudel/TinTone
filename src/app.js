const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const authRoute = require('../routes/authRoute');
const musicRoute = require("../routes/musicRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoute)
app.use('/api/auth', authRoute)
app.use('/api/music', musicRoute);

module.exports = app;