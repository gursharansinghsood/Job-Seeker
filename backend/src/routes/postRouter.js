const { createPost, getPost, getPostById, getPostByUsername, getApplicantsByPost } = require("../controller/postController")

const express = require("express")

const Router = express.Router()

Router.post('/recruiter/posts', createPost)
Router.get('/recruiter/posts', getPost)
Router.get('/recruiter/posts/:id', getPostById) 
Router.get('/recruiter/myposts/:username', getPostByUsername)        
Router.get('/recruiter/applicants/:postId', getApplicantsByPost)  

module.exports = Router