require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const mongoose = require('mongoose');

// ====================================Middleware=============================================================
const middleware = require ('./middlewares/middlewares');

// ====================================Controllers=============================================================

const homeController = require ('./controllers/Home');
const authController = require ('./controllers/Auth')
const adminController = require('./controllers/Admin');
const patientController = require('./controllers/Patient');
const scheduleController = require('./controllers/Schedule');

const app = express();
const port = process.env.PORT;

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', './layouts/source/main');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({ 
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URI).then(() => {
    console.log("Conectado ao banco de dados com sucesso!");
}).catch((err) => {
    console.log("Erro ao se conectar ao banco de dados: " + err);
    process.exit();
});

//==================================================Source==================================================

app.get("/", middleware.verifySpecialRoutes, (req, res) =>{
    res.redirect('/user/login');
});

app.get("/user/login", middleware.verifySpecialRoutes, (req, res) => {
    authController.getAuth(req,res,app)
});

app.post("/user/login", (req, res) => {
    authController.Authentication(req,res)
})

app.get("/home", middleware.verifyAuth, (req,res) => {
    homeController.getHome(req,res,app);
});

//==================================================Admin==================================================

app.get("/register/admin", (req, res) => {
    adminController.getRegisterAdmin(req,res,app);
});

app.post("/register/admin", (req, res) => {
    adminController.postRegisterAdmin(req,res);
});

app.get("/list/admins", (req, res) => {
    adminController.listAdmins(req,res,app);
});

app.get("/list/admins/delete/:id", (req, res) => {
    adminController.deleteAdmin(req,res,app);
});

app.get("/list/admins/edit/:id", (req, res) => {
    adminController.editAdmin(req,res,app);
});

app.post("/list/admins/edit/send", (req, res) => {
    adminController.editAdminSend(req,res,app);
});

//==================================================Patient==================================================

app.get("/register/patient", (req, res) => {
    patientController.getRegisterPatient(req,res,app);
});

app.post("/register/patient", (req, res) => {
    patientController.postRegisterPatient(req,res);
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

//==================================================Schedule==================================================

app.get("/list/schedules", (req, res) => {
    scheduleController.listSchedules(req,res,app);
});

app.get("/list/schedules/completed/:id", (req, res) => {
    scheduleController.completedSchedule(req,res,app);
});

app.get("/list/schedules/edit/:id", (req, res) => {
    scheduleController.editSchedule(req,res,app);
});

app.post("/list/schedules/edit/send", (req, res) => {
    scheduleController.editScheduleSend(req,res,app);
});

//==================================================Logout==================================================

app.get('/logout', middleware.verifyAuth, authController.logout);

//==================================================Server==================================================

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
