//Database connection
const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', () => console.error("Erro ao conectar ao banco de dados"));
db.once('open', () => console.log("Conexão com o banco de dados estabelecida"));

module.exports = db;
