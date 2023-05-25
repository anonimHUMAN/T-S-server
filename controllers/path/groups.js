const { title } = require("process")
const Ucer = require('../../model/Role')

exports.index = async (req, res) => {
    let { idTeacher } = req.query
    try {
        const data = await Ucer.findById(idTeacher)
        if (!data) {
            res.json({ title: "Teacher is not found" })
        } else if (data) {
            if (data.status == 'teacher') {
                let newData = data.group
                res.json({ title: "All groups for teacher", data: newData })
            } else {
                res.json({ title: "You are not a teacher" })
            }
        }
    } catch (e) {
        res.json({ title: "ERROR: ", e })
    }
}

exports.show = async (req, res) => {
    try {
        const data = await Ucer.findById(req.query.idTeacher).select({ group: { $elemMatch: { _id: req.params.id } } })
        if (data) {
            res.json({ title: "Special group", data })
        } else {
            res.json({ title: "Teacher or group id not error" })
        }
    } catch (e) {
        res.json({ title: "ERROR: ", e })
    }
}

exports.create = async (req, res) => {
    let { title, day, time } = req.body
    let { idTeacher } = req.query
    try {
        let idTeacherCheck = await Ucer.findById(idTeacher)
        if (title && day && time) {
            let data = await Ucer.findByIdAndUpdate(idTeacher, { $push: { group: req.body } })
            if (data) {
                if (data.status == 'teacher') {
                    res.json({ title: 'Group added to teacher', data })
                }
            } else {
                res.json({ title: 'Something error' })
            }
        }
        else {
            res.json({ title: "Enter all data for teacher!!!" })
        }
    } catch (e) {
        res.json({ title: 'ERROR: ', e })
    }
}

exports.edit = async (req, res) => {
    const { title, day, time } = req.body
    const { idTeacher } = req.query
    const idGroup = req.params.id
    if (!idTeacher && !idGroup) res.json({ title: "Err id is not defined" })
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
}

exports.remove = async (req, res) => {
    if (req.query.idTeacher && req.query.idGroup) {
        const data = await Ucer.findByIdAndUpdate(req.query.idTeacher, { $pull: { group: { _id: req.query.idGroup } } })
        if (data) {
            res.json({ title: "Group deleted" })
        } else {
            res.json({ title: "You are not a teacher" })
        }
    } else {
        res.json({ title: 'ERROR: ', desc: 'This teacher not found!!!' })
    }
}