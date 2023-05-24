const Ucer = require('../../model/Role')

exports.admin = async (req, res) => {
    let teacher = await Ucer.find({})
    let student = await Ucer.find({})
    if (teacher && student) {
        res.json({ title: "All data", teacher, student })
    }
}