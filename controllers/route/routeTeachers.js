const { title } = require("process")
const bcrypt = require('bcrypt')
const Ucer = require("../../model/Role")

exports.index = async (req, res) => {
    let { idTeacher } = req.query
    try {
        if (idTeacher) {
            let data = await Ucer.findById(idTeacher)
            if (data.status == 'teacher') {
                let group = data.group
                res.json({ title: "All group", group })
            } else {
                res.json({ title: "This user not a teacher" })
            }
        } else {
            res.json({ title: "Teacher not found" })
        }
    } catch (e) {
        res.json({ title: "Error", e })
    }
}

exports.profile = async (req, res) => {
    let data = await Ucer.findById(req.params.id)
    if (data && data.status == 'teacher') {
        res.json({ title: "Your account", data })
    } else {
        res.json({ title: "You are not a teacher" })
    }
}

exports.profilePut = async (req, res) => {
    let { email, password } = req.body
    if (email && password) {
        let hash = await bcrypt.hash(password, 10)
        let data = await Ucer.findByIdAndUpdate(req.params.id, { password: hash }, req.body)
        if (data && data.status == 'teacher') {
            res.json({ title: "Email and password edited..." })
        } else {
            res.json({ title: "You are not a teacher" })
        }
    }
    else {
        res.json({ title: "Email or password not found" })
    }
}

exports.oneGr = async (req, res) => {
    let { idTeacher, idGroup } = req.query
    try {
        if (idTeacher && idGroup) {
            const data = await Ucer.findById(idTeacher).select({ group: { $elemMatch: { _id: idGroup } } })
            if (data) {
                res.json({ title: "One group", data })
            } else {
                res.json({ title: "id teacher or id group error" })
            }
        } else {
            res.json({ title: "idTeacher or idGroup not found" })
        }
    } catch (e) {
        res.json({ title: "ERROR: ", e })
    }
}

exports.oneGrPut = async (req, res) => {
    let { title, day, time } = req.body
    let { idTeacher, idGroup } = req.query
    try {
        if (idTeacher && idGroup) {
            if (title || day || time) {
                let data = await Ucer.findOneAndUpdate(
                    {
                        _id: idTeacher,
                        "group._id": idGroup
                    },
                    {
                        $set: {
                            "group.$": { ...req.body, _id: idGroup }
                        }
                    }
                )
                res.json({ title: "Group updated", data })
            } else {
                res.json({ title: "Error: Body is not defined" })
            }
        } else {
            res.json({ title: "idTeacher or idGroup not found" })
        }
    } catch (e) {
        res.json({ title: "ERROR: ", e })
    }

}

exports.show3attend = async (req, res) => {
    let data = await Ucer.find({ status: 'student' }).sort({ score: -1 }).limit(1)
    if (!data) {
        res.json({ title: "ERROR: " })
    } else {
        res.json({ title: "Success", data })
    }
}

exports.show1attend = async (req, res) => {
    let data = await Ucer.findById(req.query.idStudent)
    if (!data) {
        res.json({ title: "ERROR: " })
    } else {
        res.json({ title: "Success", data })
    }
}

exports.addAttend = async (req, res) => {
    if (req.body.data) {
        let next1 = false
        for (let i = 0; i < req.body.data.length; i++) {
            let student = await Ucer.findById(req.body.data[i]._id, {})
            if (student.attendance[0]) {
                next1 = student.attendance[student.attendance.length - 1].time === req.body.data[0].time
            }
        }
        if (!next1) {
            req.body.data.map(async item => {
                let student = await Ucer.findByIdAndUpdate(item._id, {
                    $push: {
                        attendance: {
                            status: item.status,
                            time: item.time,
                            reason: Boolean(item.reason),
                            score: item.score
                        }
                    }
                })
            })
            res.json({ message: "Success" })
        } else {
            res.json({ title: "Error", message: "You are already add attendance to students" })
        }
    }
}

exports.totalScore = async (req, res) => {
    let { idTeacher, idGroup } = req.query
    try {
        if (idTeacher && idGroup) {
            const data = await Ucer.findById(idTeacher).select({ group: { $elemMatch: { _id: idGroup } } })
            data.group[0].students.map(async (item, i) => {
                let t = await Ucer.findById(item)
                let totalS1 = t.attendance[0].score + t.attendance[0].score
                let newT = totalS1 / t.attendance.length
                newT = Math.floor(newT)
                let data1 = await Ucer.findByIdAndUpdate(item, { totalScore: newT })
            })
            res.json({ title: "Success" })
        } else {
            res.json({ title: "idTeacher or idGroup not found" })
        }
    } catch (e) {
        res.json({ title: "ERROR: ", e })
    }
}