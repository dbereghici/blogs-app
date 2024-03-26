const passport = require("passport");
const CLIENT_URL = "http://localhost:3000/";

module.exports = app => {
  app.get("/auth/login/success", (req, res) => {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
        cookies: req.cookies
      });
    }
  });
  
  app.get("/auth/login/failed", (req, res) => {
    res.status(401).json({
      success: false,
      message: "failure",
    });
  });
  
  app.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_URL);
  });
  
  app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
  
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: CLIENT_URL,
      failureRedirect: "/login/failed",
    })
  );
}

