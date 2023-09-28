const db = require("../database/db");

function registerPatient(req, res){
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var data = {
        "name" : name,
        "email" : email,
        "password": password
    }

    db.collection('patients').insertOne(data,(err) => {
        if(err){
            throw err;
        }
        console.log("Registro bem sucedido!")
    });

    return res.redirect('index.html');
}

module.exports = {registerPatient};