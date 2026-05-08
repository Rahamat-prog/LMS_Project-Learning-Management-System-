const mongoose = require('mongoose');
const { connected } = require('node:process');

// if any error don't stop the process
mongoose.set('strictQuery', false);

// database connections
const connectionToDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URL || ' mongodb://localhost:27017/LMS');
        if (connection) {
        console.log(`connected to MongoDGB: ${connection.host}`)
    }
    }
    catch (error) {
    console.log(error.message);
    process.exit(1);
}
} 

module.exports = connectionToDB;