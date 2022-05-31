const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv= require('dotenv')
//const bodyParser = require('body-parser');
//const jwt = require('jsonwebtoken');
//const path = require('path')

const lojaroutes =require ('../backend/server/routes/lojaRoutes')
const algoritmoroutes=require ('../backend/server/routes/algoritmoRoutes')
const ewaroutes=require ('../backend/server/routes/ewaRoutes')
const useroutes=require ('../backend/server/routes/userRoutes')
const alert=require ('../backend/server/routes/alertasRoutes')
const cors = require('cors')
const cron = require("node-cron");
const shell = require('shelljs');
//const User = require('./models/SignUpModels')
//const routes = require('../backend/server/routes/routes.js');
const routesUrls = require('../backend/server/routes/routes.js')

dotenv.config()
/*
require("dotenv").config({
  path: path.join(__dirname, "../.env")
 });
  

 
const PORT = process.env.PORT || 3000;*/

mongoose.connect(process.env.DATABASE_ACCESS , () => console.log("MongoDB - iSafety Database connected"))
/*
//app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
   const accessToken = req.headers["x-access-token"];
   const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
   // Check if token has expired
   if (exp < Date.now().valueOf() / 1000) { 
    return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
   } 
   res.locals.loggedInUser = await User.findById(userId); next(); 
  } else { 
   next(); 
  } 
 });
 app.use('/', routes); app.listen(PORT, () => {
  console.log('Server is listening on Port:', PORT)
})

*/


app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/app', routesUrls)
app.use('/app', lojaroutes)
app.use('/app', algoritmoroutes)
app.use('/app', ewaroutes)
//app.use('/app', useroutes)
app.use('/app', alert)
app.listen(3000, () => console.log("Server up and running!"))

cron.schedule ( "0 */6 * * * *" ,  ( )  =>  {     
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