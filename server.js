require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
//express app
const app = express()

//middleware - code that executes between a request and response 
app.use(express.json()) // looks for body in a request and attaches it to the request object so it can be accessed in the handler

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//route handler
app.use('/api/workouts', workoutRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests once we've connected to the database
        app.listen(process.env.PORT, () => {
        console.log('connected to db and listening on port', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error)
    })



