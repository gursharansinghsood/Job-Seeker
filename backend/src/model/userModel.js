const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    role: String,
    companyname: String,
    email: { type: String, default: '' },
    skills: { type: [String], default: [] }
})

const userModel = mongoose.model("USERS", userSchema)

module.exports = userModel



