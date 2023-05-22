const Students = require("../model/Students");

exports.index = async (req, res) => {
    let data = await Students.find({}).sort({ totalscore: 1 }).limit(3)
    res.json({ title: "Success", data })
}

exports.create = async (req, res) => {
    req.body.data.map(async item => {
        let student = await Students.findByIdAndUpdate(item._id, {
            $push: {
                attendance: {
                    status: item.attendance.status,
                    time: item.attendance.time,
                    reason: item.attendance.reason,
                    score: item.attendance.score
                }
            }
        })
    })
}