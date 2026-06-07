const userModel = require('../model/userModel')
const { createNotification } = require('./notificationController')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const JWT_SECRET = "jobseeker_secret_key_2024"

// User create karo
const createUser = async (req, res) => {
    try {
        const { name, username, password, role, companyname } = req.body

        if (!name || !username || !password || !role) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const existingUser = await userModel.findOne({ username: username.toLowerCase() })

        if (existingUser) {
            return res.status(400).json({ message: "Username Already Found" })
        }

        const hashedpswd = await bcrypt.hash(password,10)

        await userModel.create({
            name,
            username: username.toLowerCase(),
            password: hashedpswd,
            role,
            companyname: companyname || ""
        })

        res.status(201).json({ message: "User Successfully Added" })

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

// Login karo
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ username: username.toLowerCase() });

    if (!existingUser) {
      return res.status(400).json({ message: "Invalid username" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

   
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        username: existingUser.username,
        role: existingUser.role,
        companyname: existingUser.companyname,
        email: existingUser.email,
        skills: existingUser.skills,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Profile update karo
const updateUser = async (req, res) => {
    try {
        const { name, username, email, skills } = req.body

        const existingUser = await userModel.findOne({
            username: username.toLowerCase(),
            _id: { $ne: req.params.id }
        })

        if (existingUser) {
            return res.status(400).json({ message: "Username already taken" })
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            req.params.id,
            { name, username: username.toLowerCase(), email, skills },
            { new: true }
        )

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" })
        }

        // Notification
        await createNotification({
            userId: req.params.id,
            type: 'profile_update',
            title: 'Profile Updated',
            message: 'Your profile has been updated successfully.'
        })

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                _id: updatedUser._id,
                name: updatedUser.name,
                username: updatedUser.username,
                role: updatedUser.role,
                companyname: updatedUser.companyname,
                email: updatedUser.email,
                skills: updatedUser.skills
            }
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createUser, loginUser, updateUser }