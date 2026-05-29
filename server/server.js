// dotenv cofig
const {config} = require('dotenv');
config();
const app = require('./app');
const connectionToDB = require('./config/dbConnection');
require("./config/cloudinary");


const PORT =    process.env.PORT || 5000

// razorpay 
const razorpay = new Razorpay({
    key_id: process.env.RAZARPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
})


app.listen(PORT, async () => {
    await connectionToDB();
    console.log(`sever is running at http://localhost:${PORT}`)
});

module.exports = razorpay;