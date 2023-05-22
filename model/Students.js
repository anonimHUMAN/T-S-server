const {
    model,
    Schema
} = require('mongoose')

module.exports = model("student", new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    ParentsPhoneNumber: {
        mother: String,
        father: String
    },
    password: String,
    totalScore: Number,
    attendance: [
        {
            status: String,
            time: String,
            reason: String,
            score: Number
        }
    ]
}, { timestamps: true })) 