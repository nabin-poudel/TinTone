const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
                role: user.role
            }
        })
    });
}

module.exports = { loginUser };