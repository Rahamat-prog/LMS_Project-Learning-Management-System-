const express = require('express');
const upload = require('../middlewares/multerMiddleware')
// console.log('upload type:', typeof upload);
// console.log('upload:', upload); // Log the actual object

const {isLoging, authorizedRoles} = require('../middlewares/authMiddleware');
// console.log('isLoging type:', typeof isLoging);
// console.log('isLoging:', isLoging); // Log the actual object

const {register, login , logout, getProfile, forgotPassword, resetPassword, changePassword, updateUser} = require('../controllers/controllers');

// instance 
const router = express.Router();

// All user-related endpoints are prefixed with /api/v1/user
router.post('/register', upload.single("avatar"), register);  // upload create req.file 
router.post('/login', login);
router.post('/logout', logout);
router.get('/get-profile', isLoging, getProfile);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:resetToken', resetPassword);
router.post('/change-password', isLoging, changePassword);
router.put('/update-user', isLoging, upload.single("avatar"), updateUser);


module.exports = router;
