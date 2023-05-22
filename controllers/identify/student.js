const Students = require('../../model/Students')

exports.student = async (req, res) => {
    let student = await Students.find({})
    if (student) {
        res.json({ title: "All students", student })
    }
}