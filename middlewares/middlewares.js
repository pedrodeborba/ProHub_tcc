function verifyAuth(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect("/user/login");
    }
}
  
function verifySpecialRoutes(req, res, next) {
    if (req.session.user) {
      res.redirect("/home");
    } else {
      next();
    }
}

module.exports = {verifyAuth, verifySpecialRoutes};
  