const { Router } = require('express')
const { checkLogin } = require('../../middleware/checkLogin')
const {
    signUp,
    signIn
} = require('../../controllers/auth/auntification')

const routes = Router()

routes.route("/")
    .post(checkLogin, signUp)
    .get(checkLogin, signIn)

module.exports = routes