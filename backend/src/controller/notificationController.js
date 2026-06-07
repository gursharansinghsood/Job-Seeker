const notificationModel = require('../model/notificationModel')

// Notification create karo (internally use hoga)
const createNotification = async ({ userId, type, title, message, postId = null }) => {
    try {
        await notificationModel.create({ userId, type, title, message, postId })
    } catch (error) {
        console.error("Notification create error:", error.message)
    }
}

// User ki saari notifications lao
const getNotifications = async (req, res) => {
    try {
        const notifications = await notificationModel
            .find({ userId: req.params.userId })
            .sort({ createdAt: -1 })

        res.status(200).json({ notifications })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Ek notification read karo
const markAsRead = async (req, res) => {
    try {
        await notificationModel.findByIdAndUpdate(req.params.id, { read: true })
        res.status(200).json({ message: "Marked as read" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Saari notifications read karo
const markAllAsRead = async (req, res) => {
    try {
        await notificationModel.updateMany(
            { userId: req.params.userId, read: false },
            { read: true }
        )
        res.status(200).json({ message: "All marked as read" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Ek notification delete karo
const deleteNotification = async (req, res) => {
    try {
        await notificationModel.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Notification deleted" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Saari notifications delete karo
const clearAll = async (req, res) => {
    try {
        await notificationModel.deleteMany({ userId: req.params.userId })
        res.status(200).json({ message: "All notifications cleared" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Unread count
const getUnreadCount = async (req, res) => {
    try {
        const count = await notificationModel.countDocuments({ 
            userId: req.params.userId, 
            read: false 
        })
        res.status(200).json({ count })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createNotification, getNotifications, markAsRead, markAllAsRead, deleteNotification, clearAll, getUnreadCount }