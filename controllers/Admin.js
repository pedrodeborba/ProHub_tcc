const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('../models/Admin');
const Admin = mongoose.model('Admin');

function getRegisterAdmin (req, res, app) {
    app.set('layout', './layouts/register/admin');
    res.render("layouts/register/admin", {erro: null});
}

async function postRegisterAdmin (req, res){
    const email = await Admin.findOne({ email: req.body.email });
    if (email) {
        return res.render("layouts/register/admin", { erro: "Email já cadastrado." });
    }

    const password = req.body.password;
    if(password.length < 8) {
        return res.render("layouts/register/admin", { erro: "A senha deve ter no mínimo 8 caracteres" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    };

    new Admin(newAdmin).save().then(() => {
        console.log("Admin salvo com sucesso!");
        res.redirect('/list/admins')
    }).catch((err) => {
        console.log("Erro ao salvar administrador: " + err);
        res.render("layouts/register/admin", {erro: err});
    });   
}

function listAdmins (req, res, app) {
    Admin.find().then((admins) => {
        app.set('layout', './layouts/list/admins');
        res.render("layouts/list/admins", {admins: admins});
    }).catch((err) => {
        console.log("Erro ao listar administradores: " + err);
        res.redirect('/home');
    });
}

function deleteAdmin (req, res, app) {
    Admin.deleteOne({_id: req.params.id}).then(() => {
        app.set("layout", "./layouts/list/admins");
        res.redirect('/list/admins');
    }).catch((err) => {
        console.log("Erro ao deletar administrador: " + err);
        res.redirect('/home');
    });
}

function editAdmin(req, res, app) {
    Admin.findOne({ _id: req.params.id }).then((admin) => {
        app.set('layout', './layouts/edit/admin');
        res.render("layouts/edit/admin", { admin: admin, error: null });
    }).catch((err) => {
        console.log("Erro ao listar administrador: " + err);
        res.redirect('/home');
    });
}

function editAdminSend(req, res) {
    const patId = req.body.id;

    Admin.findOne({ _id: patId }).then((pat) => {
        if (!pat) {
            res.redirect('/list/admins');
        } else {
            pat.name = req.body.name;
            pat.email = req.body.email;

            if (req.body.password) {
                if (req.body.password.length >= 8) {
                    pat.password = bcrypt.hashSync(req.body.password, 10);
                }
            }

            pat.save().then(() => {
                res.redirect('/list/admins');
            }).catch((err) => {
                console.error(err);
                res.send('Erro ao atualizar: ' + err);
            });
        }
    }).catch((err) => {
        console.error(err);
        res.send('Erro ao buscar administrador: ' + err);
    });
}

module.exports = { getRegisterAdmin, postRegisterAdmin, listAdmins, deleteAdmin, editAdmin, editAdminSend }