const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapasync = require("../utils/wrapasync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewar.js");
const usersContoller = require("../controllers/users.js")



router.get("/signup",usersContoller.randersignupform);

router.post("/signup", wrapasync(usersContoller.signup));


router.get("/login",usersContoller.loginranderform);



router.post("/login", saveRedirectUrl ,passport.authenticate("local",{failureRedirect: "/login" , failureFlash: true}),usersContoller.login)




router.get("/logout",usersContoller.logout)
module.exports = router;