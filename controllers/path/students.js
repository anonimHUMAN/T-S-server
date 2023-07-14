const { title } = require("process")
const bcrypt = require('bcrypt')
const Ucer = require("../../model/Role")
const jwt = require('jsonwebtoken')

exports.oneScore = async (req, res) => {
    jwt.verify(req.headers.authorization, 'Key', async function (err, decoded) {
        if (err) {
            res.json(err)
        } else if (decoded) {
            let data = await Ucer.findById(decoded.id)
            if (data) {
                let newData = data.attendance.slice(-1).pop()
                res.json({ title: "Your score", score: newData.score })
            }
        }
    });
}
exports.profileSt = async (req, res) => {
    jwt.verify(req.headers.authorization, 'Key', async function (err, decoded) {
        if (err) {
            res.json(err)
        } else if (decoded) {
            let data = await Ucer.findById(decoded.id)
            if (data) {
                res.json({ title: "Your profile", data })
            }
        }
    });
}
exports.index = async (req, res) => {
    let data = await Ucer.find({ status: 'student' })
    if (data) {
        res.json({ title: "All students", data })
    }
}
exports.show = async (req, res) => {
    let data = await Ucer.findById(req.params.id)
    if (data) {
        res.json({ title: "Special student", data })
    }
}
exports.create = async (req, res) => {
    let parent = req.body.ParentsPhoneNumber
    let { firstName, lastName, email, phone, password } = req.body
    let data = await Ucer.findOne({ email })
    if (!data) {
        if (firstName && lastName && email && phone && parent && password) {
            try {
                let hash = await bcrypt.hash(password, 10)
                let student = new Ucer({
                    firstName,
                    lastName,
                    totalScore: 0,
                    email,
                    phone,
                    ParentsPhoneNumber: {
                        mother: req.body.ParentsPhoneNumber.mother,
                        father: req.body.ParentsPhoneNumber.father
                    },
                    password: hash,
                    status: 'student'
                })
                student.save()
                    .then(data => {
                        if (data) {
                            res.json({ title: "Student created", data: data })
                        }
                    })
            } catch (e) {
                res.json({ title: "Error", e })
            }
        }
        else {
            res.json({ title: "Enter all data for student!!!" })
        }
    } else if (data) {
        res.json({ title: "This student already exit" })
    }
}
exports.edit = async (req, res) => {
    let mother = req.body.ParentsPhoneNumber.mother
    let father = req.body.ParentsPhoneNumber.father
    let { firstName, lastName, email, phone, password } = req.body
    console.log(mother, father);
    if (firstName || lastName || email || phone || password || mother || father) {
        if (password) {
            let hash = await bcrypt.hash(password, 10)
            let data = await Ucer.findByIdAndUpdate(req.params.id, { ...req.body, password: hash })
            if (data) {
                res.json({ title: "Student edited", data })
            }
        } else {
            let data = await Ucer.findByIdAndUpdate(req.params.id, { ...req.body })
            if (data) {
                res.json({ title: "Student edited", data })
            }
        }
    }
    else {
        res.json({ title: "Data is notfound for student!!!" })
    }
}
exports.remove = async (req, res) => {
    let data = await Ucer.findByIdAndDelete(req.params.id)
    if (data) {
        res.json({ title: "Student deleted" })
    } else {
        res.json({ title: `${req.params.id} not found` });
    }
}