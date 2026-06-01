const express = require('express');
const { getRazorPayApiKey, buySubscription, verifySubscription, cancelSubscription, allPayments } = require('../controllers/paymentControllers');
const { isLoging, authorizedRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/razorpay-key')
    .get(isLoging , getRazorPayApiKey)

router.route('/subscribe')
    .post(isLoging, buySubscription)

router.route('/verifySubscription')
    .post(isLoging, verifySubscription)

router.route('/unsubscribe')
    .post(isLoging, cancelSubscription)

router.route('/')
    .get(isLoging, authorizedRoles('ADMIN'), allPayments)

module.exports = router 