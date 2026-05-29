const getRazorPayApiKey = (req, res, next) => {
    return res.status(200).json({
        success: true,
        message: 'Razarpay API key',
        key: process.env.RAZARPAY_KEY_ID
    })
}

const buySubscription = (req, res, next) => {

}

const verifySubscription = (req, res, next) => {
    
}

const cancelSubscription = (req, res, next) => {
    
}

const allPayments = (req, res, next) => {
    
}

module.exports = {getRazorPayApiKey, buySubscription, verifySubscription, cancelSubscription, allPayments}