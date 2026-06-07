require("dotenv").config()


const required = ['MONGO_URL', 'FRONTEND_URL']

required.forEach((item) => {
    if (!process.env[item]) {
        throw new Error(item, "missing in env ")
    }
})


const config = {
    mongourl: process.env.MONGO_URL,
    frontendurl: process.env.FRONTEND_URL
}


module.exports = config