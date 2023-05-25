const { Router } = require('express')
const { checkLogin } = require('../../middleware/checkLogin')
const { signIn } = require('../../controllers/auth/auntification')

const routes = Router()

// http://localhost:3000/auth
routes.route("/")
    .get(checkLogin, signIn)

module.exports = routes