const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const authRoute = require('../routes/authRoute');
const musicRoute = require("../routes/musicRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Auth Routes
app.use('/api/auth', authRoute); // Register User

// Music Routes
app.use('/api/music', musicRoute); // Music
app.use('/api/album', musicRoute); // Album

module.exports = app;