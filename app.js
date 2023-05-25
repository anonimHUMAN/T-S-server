const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const app = express()

// Connect to MongoDB
mongoose.connect(process.env.DB_local_link)
    .then(data => {
        if (data) {
            console.log("DB connected...");
        }
    })
    .catch(err => {
        console.log(err);
    })

// Cors
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

// Get information for use
app.use('/', require('./routes/index')) // correct

// SignIn
app.use('/auth', require('./routes/auth/auntification')) // correct

// Teacher panel
app.use('/routeTeacher', require('./routes/route/routeTeacher')) // correct

// Information for teacher groups
app.use('/groups', require('./routes/path/groups')) // correct

// Information for teacher and student. Also get, get one, cretae, update, delete teacher or student
app.use('/teachers', require('./routes/path/teachers')) // correct
app.use('/students', require('./routes/path/students')) // correct

// Connect to port
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Running: ${PORT}`))