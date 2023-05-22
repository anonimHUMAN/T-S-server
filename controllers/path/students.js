const { title } = require("process")
const Students = require('../../model/Students')
const Teacher = require('../../model/Teachers')

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
        try {
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
        } catch (e) {
            res.json({ title: "Error", e })
        }
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
exports.addStudentToGroup = async (req, res) => {
    let { idTeacher, idGroup, idStudent } = req.body
    if (idTeacher && idGroup && idStudent) {
        let teacher = await Teacher.findById(idTeacher)
        if (!teacher) {
            res.json({ title: "Teacher not found..." })
        } else {
            let group = await Teacher.findOneAndUpdate(
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
        let teacher = await Teacher.findById(idTeacher)
        if (!teacher) {
            res.json({ title: "Teacher not found..." })
        } else {
            let group = await Teacher.findOneAndUpdate(
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