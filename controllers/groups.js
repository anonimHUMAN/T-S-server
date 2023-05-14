const { title } = require("process")
const Teacher = require('../models/Teachers')

exports.index = async (req, res) => {
    let { idTeacher } = req.query
    const data = await Teacher.findById(idTeacher, ["group"])
    if (data) {
        res.json({ title: "All groups for teacher", data })
    }
}
exports.show = async (req, res) => {
    try {
        const data = await Teacher.findById(req.query.idTeacher).select({ group: { $elemMatch: { _id: req.params.id } } })
        if (data) {
            res.json({ title: "Special teacher", data })
        }
    } catch (e) {
        res.json({ title: "ERROR: ", e })
    }
}
exports.create = async (req, res) => {
    let { title, day, time } = req.body
    let { idTeacher } = req.query
    try {
        let idTeacherCheck = await Teacher.findById(idTeacher)
        if (title && day && time) {
            let data = await Teacher.findByIdAndUpdate(idTeacher, { $push: { group: req.body } })
            if (data) {
                res.json({ title: 'Group added to teacher', data })
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
// http://localhost:3000/groups/645d042cf5f09148a52261b8?idTeacher=6454bca9541ea2c365e58dbb
exports.edit = async (req, res) => {
    const { title, day, time } = req.body
    const { idTeacher } = req.query
    const idGroup = req.params.id

    if (!idTeacher && !idGroup) res.json({ title: "Err id is not defined" })
    if (title || day || time) {
        let data = await Teacher.findOneAndUpdate(
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
        // console.log(data);
        res.json({ title: "Group updated", data })
    } else {
        res.json({ title: "Error: Body is not defined" })
    }
}
exports.remove = async (req, res) => {
    if (req.query.idTeacher && req.query.idGroup) {
        const data = await Teacher.findByIdAndUpdate(req.query.idTeacher, { $pull: { group: { _id: req.query.idGroup } } })
        if (data) {
            res.json({ title: "Group deleted" })
        }
    } else {
        res.json({ title: 'ERROR: ', desc: 'This teacher not found!!!' })
    }
}