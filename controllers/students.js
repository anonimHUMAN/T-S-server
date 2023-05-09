const { title } = require("process")
const Students = require('../models/Students')

exports.index = async (req, res) => {
    let data = await Students.find({})
    if (data) {
        res.json({ title: "All students", data })
    }
}
exports.show = async (req, res) => {
    let data = await Students.findById(req.params.id)
    if (data) {
        res.json({ title: "Special student", data })
    }
}
exports.create = (req, res) => {
    let parent = req.body.ParentsPhoneNumber
    let attendance = req.body.attendance
    let { firstName, lastName, email, phone, password, totalScore } = req.body
    if (firstName && lastName && email && phone && parent && attendance && password && totalScore) {
        let student = new Students({
            firstName,
            lastName,
            email,
            phone,
            ParentsPhoneNumber: {
                mother: req.body.ParentsPhoneNumber.mother,
                father: req.body.ParentsPhoneNumber.father
            },
            password,
            totalScore,
            attendance: [
                {
                    status: req.body.attendance[0].status,
                    time: req.body.attendance[0].time,
                    reason: req.body.attendance[0].reason,
                    score: req.body.attendance[0].score
                }
            ]
        })
        student.save()
            .then(data => {
                if (data) {
                    res.json({ title: "Students created", data: data })
                }
            })
    }
    else {
        res.json({ title: "Enter all data for student!!!" })
    }
}
exports.edit = async (req, res) => {
    let { firstName, lastName, email, phone, password, totalScore } = req.body
    if (firstName || lastName || email || phone || password || totalScore) {
        let data = await Students.findByIdAndUpdate(req.params.id, req.body)
        if (data) {
            res.json({ title: "Student edited", data })
        }
    }
    else {
        res.json({ title: "Data is notfound for student!!!" })
    }
}
exports.remove = async (req, res) => {
    let data = await Students.findByIdAndDelete(req.params.id)
    if (data) {
        res.json({ title: "Student deleted" })
    } else {
        res.json({ title: `${req.params.id} not found` });
    }
}