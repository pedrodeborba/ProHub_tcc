const mongoose = require('mongoose');
require('../models/Patient');
const Patient = mongoose.model('Patient');

function listPatients (req, res, app) {
    Patient.find().then((patients) => {
        app.set('layout', './layouts/listPatients');
        res.render("layouts/listPatients", {patients: patients});
    }).catch((err) => {
        console.log("Erro ao listar pacientes: " + err);
        res.redirect('/');
    });
}

module.exports = { listPatients }