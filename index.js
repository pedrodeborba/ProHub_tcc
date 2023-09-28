const express = require("express");
const bodyParser = require("body-parser");

//controllers
const registerPatientController = require('./controllers/registerPatientController');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (req, res) =>{
    return res.redirect("index.html");
});

app.post("/registerPatient", registerPatientController.registerPatient);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
