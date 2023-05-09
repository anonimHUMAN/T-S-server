const {
    model,
    Schema
} = require('mongoose')

module.exports = model("student", new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    ParentsPhoneNumber: {
        mother: Number,
        father: Number
    },
    password: String,
    totalScore: Number,
    attendance: [
        {
            status: String,
            time: Date,
            reason: String,
            score: Number
        }
    ]
}, { timestamps: true })) 