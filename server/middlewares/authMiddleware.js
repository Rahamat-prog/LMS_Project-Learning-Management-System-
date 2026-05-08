const jwt = require('jsonwebtoken');

const isLoging = (req, res, next) => {
    // extract the token 
    const {token} = req.cookie;

    if (!token) {
        return next (new AppError("unauthorized please login again", 401))
    }

    const userDetails = jwt.verify(token, process.env.JWT_SECRET);
     req.user = userDetails;
     
     next();

}

module.exports = isLoging;