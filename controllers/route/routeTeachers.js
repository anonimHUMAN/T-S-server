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