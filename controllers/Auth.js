const mongoose = require('mongoose');
require('../models/Admin');
const Admin = mongoose.model('Admin');

function getAuth(req, res, app) {
    app.set('layout', './layouts/login');
    res.render("layouts/login", { error: null });
}

async function Authentication(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        res.render("layouts/login", { error: "Preencha todos os campos" });
        return;
    }

    try {
        const admin = await Admin.findOne({ email });

        if (!admin) {
            console.log(email, password)
            res.render("layouts/login", { error: "Credenciais inválidas" });
            return;
        }

        if (admin.password === password ) {
            res.redirect("/home");
        } else {
            res.render("layouts/login", { error: "Credenciais inválidas" });
        }
    } catch (error) {
        console.error(error);
        res.render("layouts/login", { error: "Erro ao autenticar" });
    }
}

module.exports = { getAuth, Authentication };
