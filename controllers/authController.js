const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { username, email, password, role = "user" } = req.body;
    if(!username || !email || !password) res.send("Invalid Field");

    // Checking User existence
    const isUserExist = await userModel.findOne({
        $or: [{ username }, { email }]
    });

    if (isUserExist) {
        return res.status(409).json({
            message: "User already exists"
        });
    }

    // Hashing Password + User Creation
    bcrypt.genSalt(10, async (err, salt) => {
        await bcrypt.hash(password, salt, async (err, hash) => {

            // Creating User
            const user = await userModel.create({
                username, email, password: hash, role
            });

            const token = jwt.sign({
                id: user._id,
                role: user.role
            }, process.env.JWT_SECRET);
            
            res.status(201).json({
                message: "User Register Successfully",
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            })
        })
    })
};

module.exports = { registerUser };