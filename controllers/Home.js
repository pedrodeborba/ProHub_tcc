function getHome(req,res,app){
    app.set('layout', './layouts/start/home');
    res.render("layouts/start/home", {error: null});
}

module.exports = { getHome };