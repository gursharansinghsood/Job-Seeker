const mongoose = require('mongoose')

const appliedJobSchema = new mongoose.Schema({
    userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'USERS' },
    postId:    { type: mongoose.Schema.Types.ObjectId, ref: 'post' },  
    appliedAt: { type: Date, default: Date.now },
    status:    { type: String, enum: ['pending', 'shortlisted', 'rejected'], default: 'pending' }
}, { timestamps: true })

const appliedJobModel = mongoose.model("APPLIED_JOBS", appliedJobSchema)
module.exports = appliedJobModel