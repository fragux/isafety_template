const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv= require('dotenv')
const routesUrls = require('./routes/routes')
const cors = require('cors')
const cron = require("node-cron");
const shell = require('shelljs');

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("MongoDB - iSafety Database connected"))

//app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/app', routesUrls)
app.listen(3000, () => console.log("Server up and running!"))

cron.schedule ( "0 */6 * * *" ,  ( )  =>  {     
    console.log('---------------------');
    console.log('Running Cron Job');
    console.log('---------------------');
    console.log('Algoritmo iSafety -> 6H');
    if (shell.exec('py isafety.py').code !== 0) {
        shell.exit(1);
    }
      else {
        shell.echo('Cron task completed!!!!');
      }
});