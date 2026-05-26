const express = require('express');
const { getRazorPayApiKey, buySubscription, verifySubscription, cancelSubscription, allPayments } = require('../controllers/paymentControllers');

const router = express.Router();

router.route('/razorpay-key')
    .get(getRazorPayApiKey)

router.route('/subscribe')
    .post(buySubscription)

router.route('/verifySubscription')
    .post(verifySubscription)

router.route('/unsubscribe')
    .post(cancelSubscription)

router.route('/')
    .get(allPayments)

module.exports = router 