const { Schema, model } = require('mongoose')

module.exports = model("User", new Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["admin", "teacher", "student"],
        default: "student"
    },
    info: {
        type: String
    }
}))