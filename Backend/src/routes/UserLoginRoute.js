const express = require ('express'); 
const {PostUserLogin,forgotPassword,resetPassword, verifyOtp} = require( '../controllers/UserLoginController');




const router = express.Router();

router.post('/user/login',PostUserLogin);
router.post('/user/forgot-password',forgotPassword);
router.post('/user/reset-password',resetPassword);
router.post('/user/verify-otp',verifyOtp);

module.exports = router ;