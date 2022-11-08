require("dotenv").config();
require("./database/index");
const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./config/config")
const routeReport = require("./routes/routeReport");
const path = require("path");
const { application } = require("express");
const teste= "fffdd";
app.use(cors(config.cors));

app.use("/report",express.json(), routeReport);

app.listen(PORT, () => {
    console.log(`Server running Port ${PORT}`);
});
