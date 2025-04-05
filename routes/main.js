const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const powerbiController = require("../controllers/powerbi");
const { ensureAuth } = require("../middleware/auth");

//Main Routes 
router.get("/", homeController.getIndex);
router.get("/ready", homeController.getReady);
router.get("/test", homeController.getTest);
router.get("/first_report", powerbiController.getEmbeddedReport);
router.get("/second_report", homeController.getSecondReport);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/contact_form_success", homeController.getContactSuccess);

//Route for signup verification (check your email rendering page)
router.get("/signup/verify", homeController.getEmailVerify);

//Route for handling message submissions

router.post("/sendEmail", postsController.sendEmail);
router.post("/quizCheck", postsController.quizCheck);

//Routes for user login/signup
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

//Route for signup-token verification
router.get("/verify", authController.getTokenVerify);


module.exports = router;
