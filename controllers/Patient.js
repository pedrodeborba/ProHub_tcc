const mongoose = require('mongoose');
require('../models/Patient');
const Patient = mongoose.model('Patient');
const bcrypt = require('bcrypt');

function listPatients (req, res, app) {
    Patient.find().then((patients) => {
        app.set('layout', './layouts/listPatients');
        res.render("layouts/listPatients", {patients: patients});
    }).catch((err) => {
        console.log("Erro ao listar pacientes: " + err);
        res.redirect('/');
    });
}

function deletePatient (req, res, app) {
    Patient.deleteOne({_id: req.params.id}).then(() => {
        app.set("layout", "./layouts/listPatients");
        res.redirect('/list/patients');
    }).catch((err) => {
        console.log("Erro ao deletar paciente: " + err);
        res.redirect('/');
    });
}

function editPatient (req, res, app) {
    Patient.findOne({_id: req.params.id}).then((patient) => {
        app.set('layout', './layouts/editPatients');
        res.render("layouts/editPatients", {patient: patient, error: null});
    }).catch((err) => {
        console.log("Erro ao listar paciente: " + err);
        res.redirect('/');
    });
}

function editPatientSend (req, res) {
    const patId = req.body.id;

    Patient.findOne({ _id: patId }).then((pat) => {
        if (!pat) {
            res.redirect('/list/patients');
        } else {
            pat.name = req.body.name;
            pat.email = req.body.email;
            pat.password = bcrypt.hashSync(req.body.password, 10);

            pat.save().then(() => {
                res.redirect('/list/patients');
            }).catch((err) => {
                console.error(err);
                res.send('Erro ao atualizar: ' + err);
            });
        }
    }).catch((err) => {
        console.error(err);
        res.send('Erro ao buscar paciente: ' + err);
    });
}

module.exports = { listPatients, deletePatient, editPatient, editPatientSend }