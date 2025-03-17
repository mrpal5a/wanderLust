const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

router.route("/signup")
.get(userController.signUpForm)
.post(wrapAsync(userController.signUp));


router.route("/login")
.get( userController.loginForm)
.post(
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: "Invalid username or password!", // Custom error message
  }),
  wrapAsync(userController.login)
);

router.get("/logout", userController.logout);

module.exports = router;
