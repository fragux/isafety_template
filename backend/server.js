const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv= require('dotenv')
const routesUrls = require('./routes/routes')
const cors = require('cors')

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("MongoDB - iSafety Database connected"))

//app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/app', routesUrls)
app.listen(3000, () => console.log("Server up and running!"))