const {Router} = require('express');
const {contactUs, userStats} = require('../controllers/miscellaneousController');
const {isLoging, authorizedRoles} = require('../middlewares/authMiddleware');

const router = Router();

// {{URL}}/api/v1/
router.route('/contact')
      .post(contactUs)

router.route('/admin/stats/users')
      .get(isLoging, authorizedRoles('ADMIN'), userStats)

module.exports = router