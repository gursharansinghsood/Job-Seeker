const express = require('express')
const { loginUser, createUser, updateUser } = require('../controller/UserController')

const Router = express.Router()


Router.post("/user/login", loginUser)
Router.post("/user/signup", createUser)
Router.put('/user/update/:id', updateUser)


module.exports = Router