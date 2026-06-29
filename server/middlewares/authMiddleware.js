const jwt = require('jsonwebtoken');
const AppError = require('../utils/errorUtils')
const User = require('../models/userModel')

const isLoging = (req, res, next) => {
   try {
     // extract the token // User's token stored in browser cookies automatically send karta h
    const {token} = req.cookies;

    if (!token) {
        // Agar token nahi hai, unauthorized error bhejo
        return next (new AppError("unauthorized please login again", 401))
    }
        //  Verify the token using JWT_SECRET
    const userDetails = jwt.verify(token, process.env.JWT_SECRET); //JWT_SECRET is a secret key used to encrypt and decrypt tokens
    console.log("userDetals", userDetails)

    // Attach user details to request object
     req.user = userDetails;

    //Call next() to move to controller
     next();

   } catch (error) {
    // Token invalid/expired hone par ye catch hoga
    return next(new AppError("Invalid or expired token", 401))
   }
}

// Authorized middleware -> 
const authorizedRoles = (...roles) => async(req, res, next) => {
    const currrentUserRole =   req.user.role
    if(!roles.includes(currrentUserRole)){
        return next(new AppError('You are not authorized person to access'))
    }
    next();
}

// subscription staus is use from directly db instead of use from JWT token because after unsubcribe the user still access the lecture, after unsubscribe his subscription staus is still active untill the user is logout or refresh the token. so as we want after unsubscribe the user immediately not able to access the lecture or any future.

const authorizeSubscriber = () => async (req, res, next) => {
    const { _id, role } = req.user;

    if (role === 'ADMIN') {
        return next();
    }

    const user = await User.findById(_id);
    if (!user) {
        return next(new AppError('Unauthorized please login again', 401));
    }

    if (user.subscription?.status !== 'active') {
        return next(new AppError('Please subscribe to access this lectures', 403));
    }

    next();
}

module.exports = {isLoging, authorizedRoles, authorizeSubscriber};



// If token was created with same secret "abc123def456ghi789jkl" || -> ahi karan se jab ham token create karte h tab a JWT_SECRET key bhi use karte h. taki veriry kar paye same token h ki nahi 
    // It will decrypt successfully and return:
    // userDetails = { id: "65f3b2c1...", email: "ali@gmail.com" }

