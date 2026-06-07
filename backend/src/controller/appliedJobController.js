const appliedJobModel = require('../model/appliedJobModel')
const { createNotification } = require('./notificationController')

// Job apply karo
const applyJob = async (req, res) => {
    try {
        const { userId, postId } = req.body

        if (!userId || !postId) {
            return res.status(400).json({ message: "userId and postId required" })
        }

        const alreadyApplied = await appliedJobModel.findOne({ userId, postId })
        if (alreadyApplied) {
            return res.status(400).json({ message: "Already applied for this job" })
        }

        await appliedJobModel.create({ userId, postId })

        // Notification
        await createNotification({
            userId,
            type: 'application_status',
            title: 'Application Submitted',
            message: 'You have successfully applied for this job.',
            postId
        })

        res.status(201).json({ message: "Job applied successfully" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// User ke saare applied jobs lao
const getAppliedJobs = async (req, res) => {
    try {
        const appliedJobs = await appliedJobModel
            .find({ userId: req.params.userId })
            .populate('postId')
            .sort({ appliedAt: -1 })

        res.status(200).json({ appliedJobs })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Status update karo
const updateStatus = async (req, res) => {
    try {
        const { status } = req.body

        const updated = await appliedJobModel.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        )

        if (!updated) {
            return res.status(404).json({ message: "Application not found" })
        }

        // Notification
        await createNotification({
            userId: updated.userId,
            type: 'application_status',
            title: 'Application Status Updated',
            message: `Your application status has been changed to "${status}".`,
            postId: updated.postId
        })

        res.status(200).json({ message: "Status updated", application: updated })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Check karo apply kiya hai ya nahi
const checkApplied = async (req, res) => {
    try {
        const { userId, postId } = req.params

        const application = await appliedJobModel.findOne({ userId, postId })

        res.status(200).json({ applied: !!application })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { applyJob, getAppliedJobs, updateStatus, checkApplied }