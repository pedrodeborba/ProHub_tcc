const mongoose = require('mongoose');
require('../models/Admin');
const Admin = mongoose.model('Admin');
const bcrypt = require('bcrypt');

function getAuth(req, res, app) {
    app.set('layout', './layouts/auth/login');
    res.render("layouts/auth/login", { error: null });
}

async function Authentication(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        res.render("layouts/auth/login", { error: "Preencha todos os campos" });
        return;
    }

    try {
        const admin = await Admin.findOne({ email });

        if (!admin) {
            res.render("layouts/auth/login", { error: "Credenciais inválidas" });
            return;
        }

        const hash = await bcrypt.compare(password, admin.password);

        if (hash) {
            req.session.user = {
                id: admin.id,
                email: admin.email,
            };
            res.redirect("/home");
        } else {
            res.render("layouts/auth/login", { error: "Credenciais inválidas" });
        }
    } catch (error) {
        console.error(error);
        res.render("layouts/auth/login", { error: "Erro ao autenticar" });
    }
}

function logout(req, res) {
    delete req.session.user;
    res.redirect("/user/login");
}

module.exports = { getAuth, Authentication, logout };
