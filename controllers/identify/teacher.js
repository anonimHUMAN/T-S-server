const Ucer = require('../../model/Role')

exports.teacher = async (req, res) => {
    let teacher = await Ucer.find({})
    if (teacher) {
        res.json({ title: "All teachers", teacher })
    }
}