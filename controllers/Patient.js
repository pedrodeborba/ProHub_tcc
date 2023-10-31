const mongoose = require('mongoose');
require('../models/Patient');
const Patient = mongoose.model('Patient');
const bcrypt = require('bcrypt');

function getRegisterPatient (req, res, app) {
    app.set('layout', './layouts/register/patient');
    res.render("layouts/register/patient", {erro: null});
}

async function postRegisterPatient (req,res){
    const email = await Patient.findOne({ email: req.body.email });
    if (email) {
        return res.render("layouts/register/patient", { erro: "Email já cadastrado." });
    }

    const password = req.body.password;
    if(password.length < 8) {
        return res.render("layouts/register/patient", { erro: "A senha deve ter no mínimo 8 caracteres" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPatient = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    };

    new Patient(newPatient).save().then(() => {
        console.log("Paciente salvo com sucesso!");
        res.redirect('/list/patients');
    }).catch((err) => {
        console.log("Erro ao salvar paciente: " + err);
        res.render("layouts/register/patient", {erro: err});
    });   
}

function listPatients (req, res, app) {
    Patient.find().then((patients) => {
        app.set('layout', './layouts/list/patients');
        res.render("layouts/list/patients", {patients: patients});
    }).catch((err) => {
        console.log("Erro ao listar pacientes: " + err);
        res.redirect('/home');
    });
}

function deletePatient (req, res, app) {
    Patient.deleteOne({_id: req.params.id}).then(() => {
        app.set("layout", "./layouts/list/patients");
        res.redirect('/list/patients');
    }).catch((err) => {
        console.log("Erro ao deletar paciente: " + err);
        res.redirect('/home');
    });
}

function editPatient(req, res, app) {
    Patient.findOne({ _id: req.params.id }).then((patient) => {
        app.set('layout', './layouts/edit/patient');
        res.render("layouts/edit/patient", { patient: patient, error: null });
    }).catch((err) => {
        console.log("Erro ao listar paciente: " + err);
        res.redirect('/home');
    });
}

function editPatientSend(req, res) {
    const patId = req.body.id;

    Patient.findOne({ _id: patId }).then((pat) => {
        if (!pat) {
            res.redirect('/list/patients');
        } else {
            pat.name = req.body.name;
            pat.email = req.body.email;

            if (req.body.password) {
                if (req.body.password.length >= 8) {
                    pat.password = bcrypt.hashSync(req.body.password, 10);
                }
            }

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


module.exports = { getRegisterPatient, postRegisterPatient, listPatients, deletePatient, editPatient, editPatientSend }