const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config()

const app = express()
mongoose.connect(process.env.DB_global_link)
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
app.use('/teachers', require('./routes/teachers'))
app.use('/students', require('./routes/students'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Running: ${PORT}`))