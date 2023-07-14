const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const { token } = require('./middleware/token');
const { checkTeacher, checkStudent, checkAdmin } = require('./middleware/checkRole');
require('dotenv').config()

const app = express()

// Connect to MongoDB
// mongoose.connect(process.env.DB_local_link)
mongoose.connect(process.env.DB_global_link)
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
app.use('/routeTeacher', token, checkTeacher, require('./routes/route/routeTeacher')) // correct

// Information for teacher and student. Also get, get one, cretae, update, delete teacher or student
app.use('/admin', token, checkAdmin, require('./routes/path/admin')) // correct
app.use('/teachers', token, checkTeacher, require('./routes/path/teachers')) // correct
app.use('/students', token, checkStudent, require('./routes/path/students')) // correct

// Information for teacher groups
app.use('/groups', token, checkTeacher, require('./routes/path/groups')) // correct

// Connect to port
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Running: ${PORT}`))