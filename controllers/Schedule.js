const mongoose = require('mongoose');
require('../models/Schedule');
const Schedule = mongoose.model('Schedule');

function listSchedules (req, res, app) {
    Schedule.find().then((schedules) => {
        app.set('layout', './layouts/list/schedules');
        res.render("layouts/list/schedules", {schedules: schedules});
    }).catch((err) => {
        console.log("Erro ao listar consultas: " + err);
        res.redirect('/home');
    });
}

function completedSchedule (req, res, app) {
    Schedule.deleteOne({_id: req.params.id}).then(() => {
        res.redirect('/list/schedules');
    }).catch((err) => {
        console.log("Erro ao marcar consulta como concluída: " + err);
        res.redirect('/list/schedules');
    });
}

function editSchedule (req, res, app) {
    Schedule.findOne({_id: req.params.id}).then((schedule) => {
        app.set('layout', './layouts/edit/schedule');
        res.render("layouts/edit/schedule", {schedule: schedule});
    }).catch((err) => {
        console.log("Erro ao editar consulta: " + err);
        res.redirect('/list/schedules');
    });
}

function editScheduleSend (req, res) {
    const scheduleId = req.body.id;

    Schedule.findOne({ _id: scheduleId }).then((schedule) => {
        if (!schedule) {
            res.redirect('/list/schedules');
        } else {
            schedule.day = req.body.day;
            schedule.month = req.body.month;
            schedule.year = req.body.year;
            schedule.time = req.body.time;

            schedule.save().then(() => {
                res.redirect('/list/schedules');
            }).catch((err) => {
                console.error(err);
                res.send('Erro ao atualizar: ' + err);
            });
        }
    }).catch((err) => {
        console.error(err);
        res.send('Erro ao buscar consulta: ' + err);
    });
}


module.exports = { listSchedules, completedSchedule, editSchedule, editScheduleSend }