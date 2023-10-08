const mongoose = require('mongoose');
require('../models/Patient');
const Patient = mongoose.model('Patient');

function getRegister (req, res, app) {
    app.set('layout', './layouts/registerPatient');
    res.render("layouts/registerPatient", {erro: null});
}

function postRegister (req,res){
    const newPatient = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    new Patient(newPatient).save().then(() => {
        console.log("Paciente salvo com sucesso!");
        res.redirect('/home');
    }).catch((err) => {
        console.log("Erro ao salvar paciente: " + err);
        res.render("layouts/registerPatient", {erro: err});
    });
}

module.exports = { getRegister, postRegister};