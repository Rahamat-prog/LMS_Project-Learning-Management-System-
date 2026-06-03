const Payment = require('../models/paymentModel');
const AppError = require('../utils/errorUtils');
const razorpay = require('../config/razorpay');
const User = require('../models/userModel');
const crypto = require('crypto');

const getErrorMessage = (error) => {
    if (!error) return 'something went wrong';
    if (typeof error === 'string') return error;
    if (error.message) return error.message;
    if (error.error && error.error.description) return error.error.description;
    if (error.description) return error.description;
    try { return JSON.stringify(error); } catch { return 'something went wrong'; }
}

const getRazorPayApiKey = (req, res, next) => {
    return res.status(200).json({
        success: true,
        message: 'Razarpay API key',
        key: process.env.RAZORPAY_KEY_ID
    })
}

const buySubscription = async (req, res, next) => {

    try {
        // extract the id from the auth middleware 
        const id = req.user._id;
        // console.log("id -> ", id)

        //find the user by id 
        const user = await User.findById(id);
        console.log('user is -> ', user)

        // if user is not available
        if (!user) {
            return next(new AppError('Unauthorized please login', 401));
        }
        // Admin can't purchesed subscription
        if (user.role === 'ADMIN') {
            return next(new AppError('Admin can not purchase a subscription', 400));
        }

        // create subscription through razorpay | This calls Razorpay's API to create a subscription. Think of it like asking Razorpay: | Razorpay returns a subscription object containing an id and status.

        const subscription = await razorpay.subscriptions.create({
            plan_id: process.env.RAZORPAY_PLAN_ID,
            customer_notify: 1,
            total_count: 12 // required when the plan does not specify an end date
        })
        //  Save subscription info to the user
        user.subscription.id = subscription.id;
        user.subscription.status = subscription.status;

        // save user with purchased subs
        await user.save();

        // sent the respose to the user
        return res.status(200).json({
            success: true,
            message: 'Subscribed successfully',
            subscribe_id: subscription.id
        })
    } catch (error) {
        console.error('buySubscription error:', error);
        return next(new AppError(getErrorMessage(error), 500));
    }
}

/*🤔 Why Do We Need Verification?
When Razorpay processes a payment, it sends back some IDs. But how do you know those IDs are genuinely from Razorpay and not from a hacker faking a successful payment? That's what this function solves using a signature verification*/

const verifySubscription = async (req, res, next) => {
    try {
        // Extract the id from the auth middleware 
        const id = req.user._id;
        //1. Extract data from request | After payment, Razorpay sends these 3 things to your frontend, which then forwards them to this endpoint:
        const { razorpay_payment_id, razorpay_signature, razorpay_subscription_id } = req.body;

        // console.log("razorpay paym id->", razorpay_payment_id);
        // console.log("razorpay sig->",  razorpay_signature);
        // console.log("razorpay sub id->", razorpay_subscription_id);

        // find the usr 
        const user = await User.findById(id);
        // if user is not available
        if (!user) {
            return next(new AppError('Unauthorized please login', 401));
        }
        // This was saved in DB during buySubscription(). We use it to cross-verify.
        const subscriptionId = user.subscription.id;
        // console.log("user subs id->", subscriptionId)

        //3. 🔐 Generate your own signature — The Core Logic | Razorpay internally does the SAME thing - sends this as razorpay_signature to your frontend | And you do the same thing on your server: → you compare this with razorpay_signature
        const generateSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_SECRET) //Use your Razorpay secret as the key
            .update(`${razorpay_payment_id}|${subscriptionId}`)//Combine payment & subscription ID as data
            .digest('hex')
        // console.log("generate sig->", generateSignature);

        // ✅ Match → Payment is genuine, came from Razorpay | ❌ No Match → Someone tampered with the data, reject it
        if (generateSignature !== razorpay_signature) {
            return next(new AppError('Payment not verified, please try again', 500));
           
        }

        //5. Save payment record to DB
        await Payment.create({
            razorpay_payment_id,
            razorpay_signature,
            razorpay_subscription_id
        })

        //6. Activate the user's subscription | Only after verified payment, the subscription status is changed from created → active.
        user.subscription.status = 'active';
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Payment verified successfully'
        })
    } catch (error) {
        // console.error('verifySubscription error:', error);
        return next(new AppError(getErrorMessage(error), 500));
    }
}


const cancelSubscription = async (req, res, next) => {
    try {
        // extract the id 
        const id = req.user._id;

        // find the user in the db
        const user = await User.findById(id);

        // check user is available ?
        if (!user) {
            return next(new AppError('Unauthorized please login', 401));
        }
        // Admin can't purchesed subscription
        if (user.role === 'ADMIN') {
            return next(new AppError('Admin can not purchase a subscription', 400));
        }

        const subscriptionId = user.subscription.id;

        // cancel the subscription
        const subscription = await razorpay.subscriptions.cancel(subscriptionId)

        //change the status of the subscription | subscription.status is the status returned by Razorpay after razorpay.subscriptions.cancel(...)

        user.subscription.status = subscription.status;
        await user.save();

        // sent the respose to the user.
        return res.status(200).json({
            success: true,
            message: 'subscription cancelled successfully'
        })

    } catch (error) {
        console.error('cancelSubscription error:', error);
        return next(new AppError(getErrorMessage(error), 500));
    }
}

const allPayments = async (req, res, next) => {
    try {
        // 1. Get count from query param
        let { count } = req.query;

        // 2. count should be validated
        count = Math.min(parseInt(req.query.count) || 10, 100); // max 100

        // 2. Fetch all subscriptions from Razorpay
        const subscriptions = await razorpay.subscriptions.all({
            count: count || 10,
            // from: startDate,   // Unix timestamp
            // to: endDate        // Unix timestamp
        })
        //Returns the full subscription list to whoever called this API (usually your Admin Dashboard frontend).
        return res.status(200).json({
            success: true,
            message: 'All payments',
            subscriptions
        })
    } catch (error) {
        console.error('allPayments error:', error);
        return next(new AppError(getErrorMessage(error), 500));
    }
}

module.exports = { getRazorPayApiKey, buySubscription, verifySubscription, cancelSubscription, allPayments }