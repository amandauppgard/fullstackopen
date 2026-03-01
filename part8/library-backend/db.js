const mongoose = require('mongoose')

const connectToDatabase = async (uri) => {
    console.log('connecting to database URI:', uri)

    try {
        await mongoose.connect(uri)
        console.log('connected to MongoDB')
    } catch (error) {
        console.error('error connecting to MongoDB:', error.message)
        process.exit(1)
    }
}

module.exports = connectToDatabase