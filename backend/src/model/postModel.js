const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    jobTitle: {
        type: String, required: true
    },
    jobDescription: {
        type: String, required: true
    },
    location: {
        type: String, required: true

    },
    jobType: {
        type: String, enum: ["Full Time", "Part Time", "Remote", "Internship"], default: "Full Time"
    },
    experience: {
        type: String, required: true
    },
    salaryRange: {
        min: { type: Number },
        max: { type: Number }
    },
    skills: [{ type: String }],
    username: {
        type: String, required: true
    },
    companyName: {
        type: String, required: true
    },
}, { timestamps: true })


const postModel = mongoose.model('post',postSchema)

module.exports = postModel