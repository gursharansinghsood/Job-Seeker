const { getNotifications, markAsRead, markAllAsRead, deleteNotification, clearAll, getUnreadCount } = require('../controller/notificationController')
const express = require('express')
const Router = express.Router()

Router.get('/notifications/:userId', getNotifications)
Router.get('/notifications/unread/:userId', getUnreadCount)
Router.put('/notifications/read/:id', markAsRead)
Router.put('/notifications/readall/:userId', markAllAsRead)
Router.delete('/notifications/delete/:id', deleteNotification)
Router.delete('/notifications/clear/:userId', clearAll)

module.exports = Router