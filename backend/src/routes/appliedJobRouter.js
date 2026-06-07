const { applyJob, getAppliedJobs, updateStatus, checkApplied } = require('../controller/appliedJobController')
const express = require('express')
const Router = express.Router()

Router.post('/applied/apply', applyJob)
Router.get('/applied/check/:userId/:postId', checkApplied)    
Router.get('/applied/:userId', getAppliedJobs)              
Router.put('/applied/status/:id', updateStatus)

module.exports = Router