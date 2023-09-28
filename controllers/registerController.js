const db = require("../database/db");
const bcrypt = require('bcrypt');

function getRegister (req, res, app) {
    app.set('layout', './layouts/register');
    res.render("layouts/register", {erro: null});
}

function register(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    if (password.length < 8) {
        res.render("layouts/register", { erro: "A senha deve ter no mínimo 8 caracteres" });
    }else{
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                throw err;
            }
    
            var data = {
                "name": name,
                "email": email,
                "password": hashedPassword 
            };
    
            db.collection('patients').insertOne(data, (err) => {
                if (err) {
                    throw err;
                }
                console.log("Registro bem sucedido!");
                
                res.redirect("/home");
            });
        });
    }
}

module.exports = { getRegister, register};
