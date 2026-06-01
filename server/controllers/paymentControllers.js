const Payment = require('../models/paymentModel');
const AppError = require('../utils/errorUtils');
const razorpay = require('../config/razorpay');
const User = require('../models/userModel');

const getRazorPayApiKey = (req, res, next) => {
    return res.status(200).json({
        success: true,
        message: 'Razarpay API key',
        key: process.env.RAZORPAY_KEY_ID
    })
}

const buySubscription = async (req, res, next) => {

  try {
      const { id } = req.user;
    //find the user by id 
    const user = User.findById(id);

    // if user is not available
    if (!user) {
        return next(new AppError('Unauthorized please login', 401));
    }
    // Admin can't purchesed subscription
    if (user.role === 'ADMIN') {
        return next(new AppError('Admin can not purchase a subscription', 400));
    }

    // create subscription through razorpay
    const subscription = await razorpay.subscription.create({
        plan_id: process.env.RAZORPAY_PLAN_ID,
        customer_notify: 1
    })

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    // save user with purchased subs
    await user.save();

    return res.status(200).json({
        success: true,
        message: 'Subscribed successfully',
        subscribe_id: subscription.id
    })
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
}

const verifySubscription = async (req, res, next) => {
   try {
     const { id } = req.user;
    const { razorpay_payment_id, razorpay_signature, razorpay_subscription_id } = req.body;

    // find the usr 
    const user = await User.findById(id);
    // if user is not available
    if (!user) {
        return next(new AppError('Unauthorized please login', 401));
    }
    // subscription id 
    const subscriptionId = user.subscription.id;

    // generate custom signature for verify the payment
    const generateSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_SECRET)
        .update(`${razorpay_payment_id} | ${subscriptionId}`)
        .digest('hex')

    // compaire the signature
    if (generateSignature !== razorpay_signature) {
        return next(new AppError('Payment not verified, please try again', 500));
    }

    // if payment is done so create entry 
    await Payment.create({
        razorpay_payment_id,
        razorpay_signature,
        razorpay_subscription_id
    })

    // after payment changed the status of subscription 
    user.subscription.status = 'active',
        await user.save();

    return res.status(200).json({
        success: true,
        message: 'Payment verified successfully'
    })
   } catch (error) {
    return next(new AppError(error.message, 500));
  }
}


const cancelSubscription = async (req, res, next) => {
  try {
      const { id } = req.user;

    // find the user
    const user = await User.findById(id);

    // if user is not available
    if (!user) {
        return next(new AppError('Unauthorized please login', 401));
    }
    // Admin can't purchesed subscription
    if (user.role === 'ADMIN') {
        return next(new AppError('Admin can not purchase a subscription', 400));
    }

    const subscriptionId = user.subscription.id;

    // cancel the subscription
    const subscription = await razorpay.subscriptions.cancel(
        subscriptionId
    )

    // change the status of the subscription
    user.subscription.status = subscription.status;
    await user.save();

    return res.status(200).json({
        success: true,
        message: 'subscription cancelled successfully'
    })

  } catch (error) {
    return next(new AppError(error.message, 500));
  }
}

const allPayments = async (req, res, next) => {
   try {
     const {count} = req.query;

    // get all the subscription
    const subscriptions = await razorpay.subscriptions.all({
        count: count || 10,
    })

    return res.status(200).json({
        success: true,
        message: 'All payments',
        subscriptions
    })
   }catch (error) {
    return next(new AppError(error.message, 500));
  }
}

module.exports = { getRazorPayApiKey, buySubscription, verifySubscription, cancelSubscription, allPayments }