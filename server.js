const express = require('express');
const cors = require('cors');
const config  = require('./app/config');
const setupContactRouters = require('./app/router/contact.router'); 
const {BadRequestError}  = require('./app/helpers/errors');

const db = require("./app/models");

db.mongoose.connect(config.db.url)
    .then(() => {
        console.log("Connected to the database!");
    })

    .catch((error)=>{
        console.log("Cannot connect to the database!", error);
        process.exit();
    });

const app = express();

app.use(cors({origin : config.app.origins}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

setupContactRouters(app);

app.use((req,res,next) => {
    next(new BadRequestError(404, "Resource not found."));
});

app.use((err, req, res, next) =>{
    console.log(err);
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error."})
});

app.get("/", (req, res) => {
    res.json({message: "Welcome to contact book application!!"});
});

const PORT = config.app.port;

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});