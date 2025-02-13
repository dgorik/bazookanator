const passport = require("passport");
const jwt = require("jsonwebtoken")
const sendEmail = require('../controllers/verification')
const validator = require("validator");
const User = require("../models/User");

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

exports.postSignup = (req, res, next) => {
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

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    isVerified: false,
    token: null
  });

  User.findOne({
    $or: [{ email: req.body.email }, { userName: req.body.userName }],
  }) //here we are checking if a user already exists in the database
    .then((existingUser) => {
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../signup");
      }
      const token = jwt.sign({userName: user.userName, email: user.email, password: user.password}, process.env.JWT_ACC_TOKEN, {expiresIn: '20m'})
      const activation_link = process.env.JWT_ACCTTIVATION_LINK + token
      sendEmail(user.userName,user.email, activation_link)
      user.token = token
      user.save()
      res.redirect('./signup/verify')
      // return user
    })
    // .then(async (user) => {
    //   try{
    //     await user.save()
    //     req.logIn(user, (err) => {
    //       if (err) {
    //         return next(err);
    //       }
    //     });
    //   }
    //   catch (error){
    //     res.status(500).json({ message: error.message });
    //   }
    // })
    .catch((err) => {
      return next(err);
    });
};

exports.getTokenVerify = (req, res, next) => {
  const { token } = req.query;
  console.log(token)
  User.findOneAndUpdate(
    {token: token},
    {isVerified: true},
    {new: true}
  )
    .then(user => {
      console.log(user)
      req.flash("errors", { msg: "Your email has been verified " });
      return res.redirect("../profile"); 
      }
    )
    .catch((error) => {
      console.log(error.message)
    })
}
