const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth } = require("../middleware/auth");

//Main Routes 
router.get("/", homeController.getIndex);
router.get("/ready", homeController.getReady);
router.get("/test", homeController.getTest);
router.get("/first_report", homeController.getFirstReport);
router.get("/second_report", homeController.getSecondReport);
router.get("/profile", ensureAuth, postsController.getProfile);

//Route for handling message submissions

router.post("/sendEmail", postsController.sendEmail);

//Routes for user login/signup
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);


module.exports = router;
