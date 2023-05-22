const Teacher = require('../../model/Teachers')

exports.teacher = async (req, res) => {
    let teacher = await Teacher.find({})
    if (teacher) {
        res.json({ title: "All teachers", teacher })
    }
}