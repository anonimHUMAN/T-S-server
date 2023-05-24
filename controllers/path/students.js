const { title } = require("process")
const bcrypt = require('bcrypt')
const Ucer = require("../../model/Role")

exports.index = async (req, res) => {
    let data = await Ucer.find({})
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
    let attendance = req.body.attendance
    let { firstName, lastName, email, phone, password, totalScore } = req.body
    let data = await Ucer.findOne({ email })
    if (!data) {
        if (firstName && lastName && email && phone && parent && attendance && password && totalScore) {
            try {
                let hash = await bcrypt.hash(password, 10)
                let student = new Ucer({
                    firstName,
                    lastName,
                    email,
                    phone,
                    ParentsPhoneNumber: {
                        mother: req.body.ParentsPhoneNumber.mother,
                        father: req.body.ParentsPhoneNumber.father
                    },
                    password: hash,
                    totalScore,
                    attendance: [
                        {
                            status: req.body.attendance[0].status,
                            time: Date(req.body.attendance[0].time),
                            reason: Boolean(req.body.attendance[0].reason),
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
            } catch (e) {
                res.json({ title: "Error", e })
            }
        }
        else {
            res.json({ title: "Enter all data for student!!!" })
        }
    } else if (data) {
        res.json({ title: "This teacher already exit" })
    }
}
exports.edit = async (req, res) => {
    let { firstName, lastName, email, phone, password, totalScore } = req.body
    if (firstName || lastName || email || phone || password || totalScore) {
        let data = await Ucer.findByIdAndUpdate(req.params.id, req.body)
        if (data) {
            res.json({ title: "Student edited", data })
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
exports.addStudentToGroup = async (req, res) => {
    let { idTeacher, idGroup, idStudent } = req.body
    if (idTeacher && idGroup && idStudent) {
        let teacher = await Ucer.findById(idTeacher)
        if (!teacher) {
            res.json({ title: "Teacher not found..." })
        } else {
            let group = await Ucer.findOneAndUpdate(
                {
                    _id: idTeacher,
                    "group._id": idGroup
                },
                {
                    $set: {
                        "group.$.students": idStudent
                    }
                })
            res.json({ title: "Success", group })
        }
    } else {
        res.json({ title: "Data is not defined..." })
    }
}
exports.removeStudentFromGroup = async (req, res) => {
    let { idTeacher, idGroup, idStudent } = req.body
    if (idTeacher && idGroup && idStudent) {
        let teacher = await Ucer.findById(idTeacher)
        if (!teacher) {
            res.json({ title: "Teacher not found..." })
        } else {
            let group = await Ucer.findOneAndUpdate(
                {
                    _id: idTeacher,
                    "group._id": idGroup
                },
                {
                    $pull: {
                        "group.$.students": idStudent
                    }
                })
            res.json({ title: "Deleted", group })
        }
    } else {
        res.json({ title: "Data is not defined..." })
    }
}