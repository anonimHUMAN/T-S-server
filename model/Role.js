const {
    model,
    Schema
} = require('mongoose')

module.exports = model("ucer", new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        require: true
    },
    phone: String,
    password: {
        type: String,
        require: true
    },
    subject: String,
    group: [
        {
            title: String,
            day: {
                type: String,
                enum: ["toq", "juft"],
                default: "toq"
            },
            time: {
                type: String,
            },
            students: [{
                type: Schema.Types.ObjectId,
                ref: 'ucer'
            }]
        }
    ],
    ParentsPhoneNumber: {
        mother: String,
        father: String
    },
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
    ],
    status: {
        type: String,
        enum: ["admin", "teacher", "student"],
        default: "student"
    },
    info: {
        type: String
    }
}, { timestamps: true }))