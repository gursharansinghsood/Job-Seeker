const mongoose = require('mongoose')
const { mongourl } = require('./config')

const connectDB = async () => {
    try {
        await mongoose.connect(mongourl)
        console.log("MongoDB is Connected")
    }
    catch(err){
        console.log(err)
    }
}


module.exports = connectDB