const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'USERS', required: true },
    type:    { 
        type: String, 
        enum: ['application_status', 'job_recommendation', 'profile_update', 'job_saved'],
        required: true
    },
    title:   { type: String, required: true },
    message: { type: String, required: true },
    read:    { type: Boolean, default: false },
    postId:  { type: mongoose.Schema.Types.ObjectId, ref: 'post', default: null }
}, { timestamps: true })

const notificationModel = mongoose.model("NOTIFICATIONS", notificationSchema)
module.exports = notificationModel