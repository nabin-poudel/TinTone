const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register User
const registerUser = async (req, res) => {
    let { username, email, password, role = "user" } = req.body;
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
            
            res.cookie("token", token);
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

// Login User
const loginUser = async (req, res) => {
    const { username, email, password } = req.body;

    // Checking user existence
    const user = await userModel.findOne({
        $or:[
            { username },
            { email }
        ]
    });
    if(user === null) return res.status(401).send("Something Went Wrong");

    // Checking password
    await bcrypt.compare(password, user.password, (err, result) => {
        if(!result) return res.send("Incorrect password, plz try again");

        const token = jwt.sign({
            id: user._id,
            role: user.role,
        }, process.env.JWT_SECRET)

        res.cookie("token", token);

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: token
            }
        })
        
    });
}

module.exports = { registerUser, loginUser };