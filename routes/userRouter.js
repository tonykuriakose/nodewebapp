const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/user/userController");
const profileController = require("../controllers/user/profileController");
const wishlistController = require("../controllers/user/wishlistController");
const {userAuth} = require("../middlewares/auth");

// Error Management
router.get("/pageNotFound", userController.pageNotFound);

// Sign up Management
router.get("/signup", userController.loadSignup);
router.post("/signup", userController.signup);
router.post("/verify-otp", userController.verifyOtp);
router.post("/resend-otp", userController.resendOtp);
router.get("/auth/google",passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/auth/google/callback",passport.authenticate("google", { failureRedirect: "/signup" }),(req, res) => {res.redirect("/")});

// Login Management
router.get("/login", userController.loadLogin);
router.post("/login", userController.login);

// Home page & Shopping page
router.get("/", userController.loadHomepage);
router.get("/logout", userController.logout);

// Profile Management
router.get("/forgot-password", profileController.getForgotPassPage);
router.post("/forgot-email-valid", profileController.forgotEmailValid);
router.post("/verify-passForgot-otp",profileController.verifyForgotPassOtp);
router.get("/reset-password",profileController.getResetPassPage);
router.post("/resend-forgot-otp",profileController.resendOtp);
router.post("/reset-password",profileController.postNewPassword);

// Wishlist Management
router.get("/wishlist", userAuth,wishlistController.loadWishlist);
router.post("/addToWishlist",userAuth, wishlistController.addToWishlist);
router.get("/removeFromWishlist",userAuth, wishlistController.removeProduct);

module.exports = router;
