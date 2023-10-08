const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('../models/Patient');
const Patient = mongoose.model('Patient');

function getRegister (req, res, app) {
    app.set('layout', './layouts/registerPatients');
    res.render("layouts/registerPatients", {erro: null});
}

async function postRegister (req,res){
    const email = await Patient.findOne({ email: req.body.email });
    if (email) {
        return res.render("layouts/registerPatients", { erro: "Email já cadastrado." });
    }

    const password = req.body.password;
    if(password.length < 8) {
        return res.render("layouts/registerPatients", { erro: "A senha deve ter no mínimo 8 caracteres" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPatient = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    };

    new Patient(newPatient).save().then(() => {
        console.log("Paciente salvo com sucesso!");
        res.redirect('/');
    }).catch((err) => {
        console.log("Erro ao salvar paciente: " + err);
        res.render("layouts/registerPatients", {erro: err});
    });   
}

module.exports = { getRegister, postRegister};