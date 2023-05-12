const { title } = require("process")
const Teacher = require('../models/Teachers')

// exports.test = async (req, res) => {
//     let { idGroup } = req.query
//     // try {
//     let data = await Teacher.findById(req.params.id)
//     console.log(data);
//     // let t = await data.some(idGroup)
//     // console.log(t);
//     // .select({ group: { $elemMath: { _id: idGroup } } })
//     // } catch (e) {
//     //     res.json({ title: "ERROR: ", e })
//     // }
//     // if (data) {
//     //     res.json({ title: "Special data", data })
//     // } else {
//     //     res.json({ title: "ERROR: " })
//     // }
// }

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
exports.edit = async (req, res) => {
    try {
        let { title, day, time } = req.body
        const data = await Teacher.findById(req.query.idTeacher).select({ group: { $elemMatch: { _id: req.params.id } } })
        if (data) {
            let DATA = {
                title: title ? title : data.group[0].title,
                day: day ? day : data.group[0].day,
                time: time ? time : data.group[0].time,
                students: data.group[0].students,
                id: data.group[0].id
            }
            if (DATA) {
                res.json({ title: "Teacher updated", DATA })
            }
        } else {
            res.json({ title: "Data not found" })
        }
    } catch (e) {
        res.json({ title: "ERROR: ", e })
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