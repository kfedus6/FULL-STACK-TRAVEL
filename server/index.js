require("dotenv").config();

const express = require("express");
const cors = require('cors');
const sequelize = require('./db');
const fileUpload = require("express-fileupload")
const path = require('path');
const router = require('./routers/index');
const models = require("./models/models");
const errorMiddlawere = require('./middleware/ErrorMiddleWare')
const sendEmail=require("./sendEmail/index");
//const {sendMessageInChat}=require("./telegramBot/index");

const app = express(router);

app.use(express.json())
app.use(cors())
app.use(fileUpload({}));
app.use('/api', router)
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(errorMiddlawere)

const PORT = process.env.PORT;

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {

            console.log('server started on port:' + PORT);

        });
    }
    catch (error) {
        console.log(error);
    }
}

start();