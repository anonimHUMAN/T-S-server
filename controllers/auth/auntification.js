const Ucer = require('../../model/Role')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signIn = async (req, res) => {
    const { email, password } = req.body
    const user = await Ucer.findOne({ email })
    if (!user) {
        res.json({ title: "ERROR: ", message: "This email not found" })
    } else {
        let isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            res.json({ title: "ERROR: ", message: "Password incorrect" })
        } else {
            let payload = {
                id: user.id,
                status: user.status
            }
            let status = user.status
            const token = await jwt.sign(payload, "Key", { expiresIn: '1h' })
            res.status(200).json({ title: "Success", message: "WELCOME your room", token, status })
        }
    }
}