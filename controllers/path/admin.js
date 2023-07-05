const Ucer = require('../../model/Role')

exports.admin = async (req, res) => {
    let teacher = await Ucer.find({ status: "teacher" })
    let student = await Ucer.find({ status: "student" })
    if (teacher && student) {
        res.json({ title: "All data", teacher, student })
    }
}
exports.adminteacher = async (req, res) => {
    let teacher = await Ucer.find({ status: "teacher" })
    if (!teacher) {
        res.json({ title: "Teachers not founded!" })
    } else {
        res.json({ title: "All teachers", teacher })
    }
}
exports.adminstudent = async (req, res) => {
    let student = await Ucer.find({ status: "student" })
    if (!student) {
        res.json({ title: "Students not founded!" })
    } else {
        res.json({ title: "All students", student })
    }
}
exports.addStudentToGroup = async (req, res) => {
    let { idTeacher, idGroup, idStudent } = req.body
    if (idTeacher && idGroup && idStudent) {
        let teacher = await Ucer.findById(idTeacher)
        if (!teacher) {
            res.json({ title: "Teacher not found" })
        } else {
            let student = await Ucer.findById(idTeacher, { group: { $elemMatch: { _id: idGroup } } })
            let lol = student.group[0].students.filter(elem => elem == idStudent)
            if (lol.length > 0) {
                res.json({ title: "Student already added to group" })
            } else {
                let group = await Ucer.findOneAndUpdate(
                    {
                        _id: idTeacher,
                        "group._id": idGroup
                    },
                    {
                        $push: {
                            "group.$.students": idStudent
                        }
                    })
                res.json({ title: "Success", group })
            }
        }
    } else {
        res.json({ title: "DATA is not defined" })
    }
}
exports.removeStudentFromGroup = async (req, res) => {
    let { idTeacher, idGroup, idStudent } = req.query
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
            res.json({ title: "Deleted" })
        }
    } else {
        res.json({ title: "Data is not defined..." })
    }
}