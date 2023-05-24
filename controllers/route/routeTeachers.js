const { title } = require("process")
const Ucer = require("../../model/Role")

exports.index = async (req, res) => {
    let { idTeacher } = req.query
    try {
        let data = await Ucer.findById(idTeacher)
        let group = data.group
        res.json({ title: "All group", group })
    } catch (e) {
        res.json({ title: "Error", e })
    }
}
exports.profile = async (req, res) => {
    let data = await Ucer.findById(req.params.id)
    if (data) {
        res.json({ title: "Your account", data })
    }
}
exports.profilePut = async (req, res) => {
    let { email, password } = req.body
    if (email && password) {
        let data = await Ucer.findByIdAndUpdate(req.params.id, req.body)
        if (data) {
            res.json({ title: "Email and password edited..." })
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
            }
        } else {
            res.json({ title: "idTeacher or idGroup not found" })
        }
    } catch (e) {
        res.json({ title: "ERROR: ", e })
    }
}

exports.oneGrPut = async (req, res) => {
    let { idTeacher, idGroup } = req.query
    try {
        if (idTeacher && idGroup) {
            const data = await Ucer.findById(idTeacher).select({ group: { $elemMatch: { _id: idGroup } } })
            if (data) {
                res.json({ title: "One group", data })
            }
        } else {
            res.json({ title: "idTeacher or idGroup not found" })
        }
    } catch (e) {
        res.json({ title: "ERROR: ", e })
    }

}