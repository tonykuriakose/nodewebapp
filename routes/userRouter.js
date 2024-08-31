const express = require('express');
const router = express.Router();
const passport = require("passport");
const userController = require('../controllers/user/userController');
const profileController = require("../controllers/user/profileController");


// Error Management
router.get("/pageNotFound",userController.pageNotFound);

// Sign up Management
router.get("/signup",userController.loadSignup);
router.post("/signup",userController.signup);
router.post("/verify-otp",userController.verifyOtp);
router.post("/resend-otp",userController.resendOtp);
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/signup'}),(req,res)=>{res.redirect('/')});

// Login Management
router.get("/login",userController.loadLogin);
router.post("/login",userController.login);

// Home page & Shopping page
router.get('/',userController.loadHomepage);
router.get("/logout",userController.logout);

// Profile Management
router.get("/forgot-password",profileController.getForgotPassPage);
router.post("/forgot-email-valid", profileController.forgotEmailValid);
router.post("/verify-PassForgot-otp", profileController.verifyForgotPassOtp);
router.post("/resend-forgot-otp",profileController.resendOtp);
router.get("/reset-password", profileController.getResetPassPage);
router.post("/reset-password", profileController.postNewPassword);









module.exports = router;