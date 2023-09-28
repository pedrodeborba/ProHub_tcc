const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const expressLayouts = require('express-ejs-layouts');

//controllers
const homeController = require ('./controllers/homeController');
const registerController = require('./controllers/registerController');

const app = express();
const port = process.env.PORT;

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (req, res) =>{
    res.redirect('/home');
});

app.get("/home", (req,res) => {
    homeController.getHome(req,res,app);
});

app.get("/register", (req, res) => {
    registerController.getRegister(req,res,app);
});

app.post("/register", registerController.register);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
