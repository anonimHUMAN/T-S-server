const User = require('../../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signUp = async (req, res) => {
    const { login, password } = req.body
    const user = await User.findOne({ login })
    if (user) {
        res.json({ title: "ERROR: ", message: "This user already exist" })
    } else {
        try {
            let hash = await bcrypt.hash(password, 12)
            let data = await User.create({ ...req.body, password: hash })
            res.json({ title: "Success", message: "User created" })
        } catch (e) {
            res.json({ title: "ERROR: ", message: e })
        }
    }
}
exports.signIn = async (req, res) => {
    const { login, password } = req.body
    const user = await User.findOne({ login })
    if (!user) {
        res.json({ title: "ERROR: ", message: "This user not found" })
    } else {
        let isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            res.json({ title: "ERROR: ", message: "Password incorrect" })
        } else {
            let payload = {
                id: user.id,
                status: user.status
            }
            const token = await jwt.sign(payload, "Key", { expiresIn: '1h' })
            res.json({ title: "Success", message: "WELCOME your room", token })
        }
    }
}