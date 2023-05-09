const { title } = require("process")
const Teacher = require('../models/Teachers')

exports.index = async (req, res) => {
    let data = await Teacher.find({})
    if (data) {
        res.json({ title: "All teachers", data })
    }
}
exports.show = async (req, res) => {
    let data = await Teacher.findById(req.params.id)
    if (data) {
        res.json({ title: "Special teacher", data })
    }
}
exports.create = (req, res) => {
    let { firstName, lastName, email, subject, phone, password } = req.body
    if (firstName && lastName && email && subject && phone && password) {
        let teacher = new Teacher({
            firstName,
            lastName,
            email,
            phone,
            password,
            subject
        })
        teacher.save()
            .then(data => {
                if (data) {
                    res.json({ title: "Teacher created", data: data })
                }
            })
    }
    else {
        res.json({ title: "Enter all data for teacher!!!" })
    }
}
exports.edit = async (req, res) => {
    let { firstName, lastName, email, subject, phone, password } = req.body
    if (firstName || lastName || email || subject || phone || password) {
        let data = await Teacher.findByIdAndUpdate(req.params.id, req.body)
        if (data) {
            res.json({ title: "Teacher edited", data })
        }
    }
    else {
        res.json({ title: "Data is notfound for teacher!!!" })
    }
}
exports.remove = async (req, res) => {
    let data = await Teacher.findByIdAndDelete(req.params.id)
    if (data) {
        res.json({ title: "Teacher deleted" })
    } else {
        res.json({ title: `${req.params.id} not found` });
    }
}