require("dotenv").config();
require("./database/index");
const PORT = process.env.PORT || 8000;
const express = require("express");
const  multer   =  require ( 'multer' ) 
const  upload  =  multer ( {  dest : 'uploads/'  } )
const app = express();
const routeReport = require("./routes/routeReport");

app.use(express.json());
app.use("/report", routeReport);

app.listen(PORT, () => {
    console.log(`Server running Port ${PORT}`);
});
