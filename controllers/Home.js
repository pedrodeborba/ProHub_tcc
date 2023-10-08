function getHome(req,res,app){
    app.set('layout', './layouts/home');
    res.render("layouts/home", {error: null});
}

module.exports = {getHome}