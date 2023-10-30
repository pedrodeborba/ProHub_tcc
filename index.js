require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

//controllers
const homeController = require ('./controllers/Home');
const authController = require ('./controllers/Auth')
const registerController = require('./controllers/RegisterPatient');
const patientController = require('./controllers/Patient');
const scheduleController = require('./controllers/Schedule');

const app = express();
const port = process.env.PORT;

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URI).then(() => {
    console.log("Conectado ao banco de dados com sucesso!");
}).catch((err) => {
    console.log("Erro ao se conectar ao banco de dados: " + err);
    process.exit();
});

app.get("/", (req, res) =>{
    res.redirect('/usuario/login');
});

app.get("/usuario/login", (req, res) => {
    authController.getAuth(req,res,app)
});

app.post("/usuario/login", (req, res) => {
    authController.Authentication(req,res)
})

app.get("/home", (req,res) => {
    homeController.getHome(req,res,app);
});

//------------------Patient------------------

app.get("/register/patients", (req, res) => {
    registerController.getRegister(req,res,app);
});

app.post("/register/patients", (req, res) => {
    registerController.postRegister(req,res);
});

app.get("/list/patients", (req, res) => {
    patientController.listPatients(req,res,app);
});

app.get("/list/patients/delete/:id", (req, res) => {
    patientController.deletePatient(req,res,app);
});

app.get("/list/patients/edit/:id", (req, res) => {
    patientController.editPatient(req,res,app);
});

app.post("/list/patients/edit/send", (req, res) => {
    patientController.editPatientSend(req,res,app);
});

//------------------Schedule------------------

app.get("/list/schedules", (req, res) => {
    scheduleController.listSchedules(req,res,app);
});

// app.get("/list/schedules/delete/:id", (req, res) => {
//     scheduleController.deleteSchedule(req,res,app);
// });

// app.get("/list/schedules/edit/:id", (req, res) => {
//     scheduleController.editSchedule(req,res,app);
// });

// app.post("/list/schedules/edit/send", (req, res) => {
//     scheduleController.editScheduleSend(req,res,app);
// });

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
