const mongoose = require('mongoose');
require('../models/Schedule');
const Schedule = mongoose.model('Schedule');

function listSchedules (req, res, app) {
    Schedule.find().then((schedules) => {
        app.set('layout', './layouts/list/schedules');
        res.render("layouts/list/schedules", {schedules: schedules});
    }).catch((err) => {
        console.log("Erro ao listar agendamentos: " + err);
        res.redirect('/home');
    });
}

module.exports = { listSchedules }