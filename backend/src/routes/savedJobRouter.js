const { saveJob, unsaveJob, getSavedJobs, checkSaved } = require('../controller/savedJobController')
const express = require('express')
const Router = express.Router()

Router.post('/saved/save', saveJob)
Router.delete('/saved/unsave/:userId/:postId', unsaveJob)
Router.get('/saved/check/:userId/:postId', checkSaved)   
Router.get('/saved/:userId', getSavedJobs)               

module.exports = Router