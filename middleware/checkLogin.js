exports.checkLogin = async (req, res, next) => {
    const { login, password } = req.body
    if (login && password) {
        next()
    } else {
        res.json({ title: "Error", message: "Login password is not defined" })
    }
}