const mongoose = require('mongoose');
require('../models/Schedule');
const Schedule = mongoose.model('Schedule');

function listSchedules (req, res, app) {
    Schedule.find().then((schedules) => {
        app.set('layout', './layouts/listSchedules');
        res.render("layouts/listSchedules", {schedules: schedules});
    }).catch((err) => {
        console.log("Erro ao listar agendamentos: " + err);
        res.redirect('/');
    });
}

// function deleteSchedule (req, res, app) {
//     Schedule.deleteOne({_id: req.params.id}).then(() => {
//         app.set("layout", "./layouts/listSchedules");
//         res.redirect('/list/schedules');
//     }).catch((err) => {
//         console.log("Erro ao deletar agendamento: " + err);
//         res.redirect('/');
//     });
// }

module.exports = {listSchedules}