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
        res.json({ title: "This teacher already exist" })
    }
}
exports.edit = async (req, res) => {
    let { firstName, lastName, email, subject, phone, password } = req.body
    if (firstName || lastName || email || subject || phone || password) {
        if (password) {
            let hash = await bcrypt.hash(password, 10)
            let data = await Ucer.findByIdAndUpdate(req.params.id, { ...req.body, password: hash })
            if (data) {
                res.json({ title: "Teacher edited", data })
            }
        } else {
            let data = await Ucer.findByIdAndUpdate(req.params.id, { ...req.body })
            if (data) {
                res.json({ title: "Teacher edited", data })
            }
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
exports.students = async (req, res) => {
    let data = await Ucer.find({ status: 'student' })
    if (data) {
        res.json({ title: "All students", data })
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
exports.crStudent = async (req, res) => {
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
                    email,
                    phone,
                    totalScore: 0,
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
exports.editPass = async (req, res) => {
    const email = req.body.email
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword
    let newUcer = await Ucer.findOne({ email })
    if (!newUcer) {
        res.json({ title: "Error", message: "User not found!" })
    } else if (newUcer) {
        bcrypt.compare(oldPassword, newUcer.password, async (err, res1) => {
            if (res1) {
                let hash = await bcrypt.hash(newPassword, 10)
                let data = await Ucer.findByIdAndUpdate(newUcer._id, { password: hash })
                res.json({ title: "Success", message: 'Password succesfully edited...' });
            } else {
                res.json({ title: "Error", message: "Old password incorrect!" })
            }
        });
    }
}