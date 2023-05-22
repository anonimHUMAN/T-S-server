const Teacher = require('../../model/Teachers')
const Students = require('../../model/Students')

exports.admin = async (req, res) => {
    let teacher = await Teacher.find({})
    let student = await Students.find({})
    if (teacher && student) {
        res.json({ title: "All data", teacher, student })
    }
}