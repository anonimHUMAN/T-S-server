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
            reason: {
                type: Boolean,
                default: false
            },
            score: Number
        }
    ]
}, { timestamps: true })) 