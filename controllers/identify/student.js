const Ucer = require('../../model/Role')

exports.student = async (req, res) => {
    let student = await Ucer.find({})
    if (student) {
        res.json({ title: "All students", student })
    }
}