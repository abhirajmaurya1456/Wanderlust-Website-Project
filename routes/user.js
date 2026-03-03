const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");
//get route for signup page
router.route("/signup")
.get(userController.renderSignupPage)
.post(wrapAsync(userController.signupUser));

//get route for login page
router.route("/login")
.get(userController.renderLoginPage)
.post(saveRedirectUrl,passport.authenticate("local",{ failureRedirect: '/login',failureFlash:true }),userController.loginUser);

//logout router
router.get("/logout",userController.logoutUser);
module.exports = router;