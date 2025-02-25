const passport = require("passport");
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require('uuid');
const sendEmail = require('../controllers/verification')
const validator = require("validator");
const User = require("../models/User");
const PendingUser = require("../models/PendingUser");

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("login", {
    title: "Login",
  });
};

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    if (!user.isVerified) {
      req.flash("errors", { msg: "Did you verify your email?" });
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      return res.redirect("/profile");
      //res.redirect(req.session.returnTo || "/profile");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("signup", {
    title: "Create Account",
  });
};

exports.postSignup = async (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!req.body.email.endsWith('@bazooka-inc.com')){
    validationErrors.push({ msg: "Please enter bazooka-inc.com emails." });
  }
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

    User.findOne({
      $or: [{ email: req.body.email }, { userName: req.body.userName }],
    }) //here we are checking if a user already exists in the database
      .then((existingUser) => {
        if (existingUser) {
          req.flash("errors", {
            msg: "Account with that email address or username already exists.",
          });
          return res.redirect("/signup");
        }
      })
      .then(() => {
        const passwordID = uuidv4();
  
        const pending_user = new PendingUser({
          userName: req.body.userName,
          email: req.body.email,
          passwordID: passwordID,
          password: req.body.password,
        });
  
        pending_user.save();
      
        const token = jwt.sign({userName: pending_user.userName, email: pending_user.email, passwordID}, process.env.JWT_ACC_TOKEN, {expiresIn: '60m'})
        const activation_link = process.env.JWT_ACCTTIVATION_LINK + token
        sendEmail(pending_user.userName, pending_user.email, activation_link)
        res.redirect('/signup/verify')
      })

      .catch((error) => {
        console.log(error.message)
      })
};

exports.getTokenVerify = async (req, res, next) => {
  const { token } = req.query;
  try{
    const decoded = jwt.verify(token, process.env.JWT_ACC_TOKEN)
    const {userName, email, passwordID} = decoded

    const pending_user = await PendingUser.findOne({ passwordID: passwordID})

    const user_password = pending_user.password

    const newUser = new User({
      userName,
      email,
      password: user_password,
      isVerified: true // Set the user as verified
    });

    await newUser.save();
    await PendingUser.remove({ passwordID: passwordID});
    req.flash("success", { msg: "Your email has been verified " });
    return res.render("index", { messages: req.flash() }); 

  }
  catch(error){
    console.log(error.message)
  }
}
     
