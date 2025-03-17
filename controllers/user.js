
const User = require("../models/user.js");

module.exports.signUpForm = (req, res) => {
    res.render("../user/signup.ejs");
  }

module.exports.signUp = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      let newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      req.login(registeredUser, (err)=>{
        if(err){
          return next(err);
        }
        req.flash("success", `Welcome, ${username}`);
        res.redirect("/listings");
      })
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }

  module.exports.loginForm =  (req, res) => {
    res.render("../user/login.ejs");
  }
  module.exports.login = async (req, res) => {
    let {username} = req.body;
    const partyEmoji = "🎉";
    req.flash("success", `Welcome back, ${username} ${partyEmoji}`);
    let redirectU = res.locals.redirectUrl || "/listings";
    res.redirect(redirectU);
  }
  module.exports.logout = (req,res)=>{
    req.logOut((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "logged you out");
        res.redirect("/listings");
    });
}
