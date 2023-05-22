const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');

const {
    token
} = require('./middleware/token');

const {
    checkAdmin,
    checkTeacher,
    checkStudent
} = require('./middleware/checkRole');

require('dotenv').config()

const app = express()
mongoose.connect(process.env.DB_local_link)
    .then(data => {
        if (data) {
            console.log("DB connected...");
        }
    })
    .catch(err => {
        console.log(err);
    })

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use('/', require('./routes/index'))

app.use('/groups', require('./routes/path/groups'))

app.use('/routeTeacher', require('./routes/route/routeTeacher'))

app.use('/teachers', require('./routes/path/teachers'))
app.use('/students', require('./routes/path/students'))

app.use('/auth', require('./routes/auth/auntification'))

app.use('/admin', token, checkAdmin, require('./routes/identfy/admin'))
app.use('/teacher', token, checkTeacher, require('./routes/identfy/teacher'))
app.use('/student', token, checkStudent, require('./routes/identfy/student'))


const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Running: ${PORT}`))