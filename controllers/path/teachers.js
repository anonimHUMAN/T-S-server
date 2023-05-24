const { title } = require("process")
const bcrypt = require('bcrypt')
const Ucer = require('../../model/Role')

exports.index = async (req, res) => {
    let data = await Ucer.find({ status: "teacher" })
    if (data) {
        res.json({ title: "All teachers", data })
    }
}
exports.show = async (req, res) => {
    let data = await Ucer.findById(req.params.id)
    if (data) {
        res.json({ title: "Special teacher", data })
    }
}
exports.create = async (req, res) => {
    let { firstName, lastName, email, subject, phone, password } = req.body
    let data = await Ucer.findOne({ email })
    if (!data) {
        if (firstName && lastName && email && subject && phone && password) {
            try {
                let hash = await bcrypt.hash(password, 10)
                let teacher = new Ucer({
                    firstName,
                    lastName,
                    email,
                    phone,
                    password: hash,
                    subject,
                    status: 'teacher'
                })
                teacher.save()
                    .then(data => {
                        if (data) {
                            res.json({ title: "Teacher created", data: data })
                        }
                    })
            } catch (e) {
                res.json({ title: "Error", e })
            }
        }
        else {
            res.json({ title: "Enter all data for teacher!!!" })
        }
    } else if (data) {
        res.json({ title: "This teacher already exit" })
    }
}
exports.edit = async (req, res) => {
    let { firstName, lastName, email, subject, phone, password } = req.body
    if (firstName || lastName || email || subject || phone || password) {
        let data = await Ucer.findByIdAndUpdate(req.params.id, req.body)
        if (data) {
            res.json({ title: "Teacher edited", data })
        }
    }
    else {
        res.json({ title: "Data is notfound for teacher!!!" })
    }
}
exports.remove = async (req, res) => {
    let data = await Ucer.findByIdAndDelete(req.params.id)
    if (data) {
        res.json({ title: "Teacher deleted" })
    } else {
        res.json({ title: `${req.params.id} not found` });
    }
}