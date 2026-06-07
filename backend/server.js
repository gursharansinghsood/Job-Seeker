const express = require('express')
const connectDB = require("./src/config/DB")
const userRouter = require("./src/routes/userRouter")
const postRouter = require("./src/routes/postRouter")
const appliedJobRouter = require('./src/routes/appliedJobRouter')
const savedJobRouter = require('./src/routes/savedJobRouter')
const notificationRouter = require('./src/routes/notificationRouter')

const cors = require('cors')
const config = require('./src/config/config')
const morgan = require('morgan')

const app = express()
const PORT = 5000
connectDB()
app.use(morgan('dev'))
app.use(cors({
    origin: config.frontendurl,
    credentials: true
}))
app.use(express.json())

// All routes
app.use("/api", userRouter)
app.use("/api", postRouter)
app.use('/api', appliedJobRouter)
app.use('/api', savedJobRouter)
app.use('/api', notificationRouter)


app.listen(PORT, () => console.log(`Server is Running on http://localhost:${PORT}`))


