const savedJobModel = require('../model/savedJobModel')
const { createNotification } = require('./notificationController')

// Job save karo
const saveJob = async (req, res) => {
    try {
        const { userId, postId } = req.body

        if (!userId || !postId) {
            return res.status(400).json({ message: "userId and postId required" })
        }

        const alreadySaved = await savedJobModel.findOne({ userId, postId })
        if (alreadySaved) {
            return res.status(400).json({ message: "Job already saved" })
        }

        await savedJobModel.create({ userId, postId })

        // Notification
        await createNotification({
            userId,
            type: 'job_saved',
            title: 'Job Saved',
            message: 'A job has been added to your saved list.',
            postId
        })

        res.status(201).json({ message: "Job saved successfully" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Job unsave karo
const unsaveJob = async (req, res) => {
    try {
        const { userId, postId } = req.params

        const deleted = await savedJobModel.findOneAndDelete({ userId, postId })

        if (!deleted) {
            return res.status(404).json({ message: "Saved job not found" })
        }

        res.status(200).json({ message: "Job unsaved successfully" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// User ke saare saved jobs lao
const getSavedJobs = async (req, res) => {
    try {
        const savedJobs = await savedJobModel
            .find({ userId: req.params.userId })
            .populate('postId')
            .sort({ savedAt: -1 })

        res.status(200).json({ savedJobs })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Check karo saved hai ya nahi
const checkSaved = async (req, res) => {
    try {
        const { userId, postId } = req.params

        const saved = await savedJobModel.findOne({ userId, postId })

        res.status(200).json({ saved: !!saved })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { saveJob, unsaveJob, getSavedJobs, checkSaved }