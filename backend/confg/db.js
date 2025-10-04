const mongoose = require('mongoose')

const connectDB = async ()=>{
    try {
        const test = await mongoose.connect(process.env.MONGO_URI);
        console.log(test.connection.name);
        console.log(test.connection.host);
        
    } catch (error) {
        console.log("Error while connecting to MongoDB : ",error);
        process.exit(1);
    }
}

module.exports = connectDB;