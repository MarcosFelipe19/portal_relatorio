require("dotenv").config();
require("./database/index");
const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./config/config")
const routeReport = require("./routes/routeReport");
const routerPropostas = require("./routes/routerPropostas");
const routerClientes = require("./routes/routerClientes");
const path = require("path");
const { application } = require("express");


app.use("/report", cors(config.cors), express.json(), routeReport);
app.use("/orc", cors(config.cors), express.json(), routerPropostas);
app.use("/clientes", cors(config.cors), express.json(), routerClientes);

app.listen(PORT, () => {
    console.log(`Server running Port ${PORT}`);
});
//quando o projeto for para teste mudar forma de gerar o nome do arquivo