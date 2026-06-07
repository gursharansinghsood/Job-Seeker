const mongoose = require('mongoose')

const savedJobSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'USERS' },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'post' }, 
    savedAt: { type: Date, default: Date.now }
}, { timestamps: true })

const savedJobModel = mongoose.model("SAVED_JOBS", savedJobSchema)
module.exports = savedJobModel