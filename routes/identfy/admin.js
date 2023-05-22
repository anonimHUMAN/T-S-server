const { Router } = require('express')
const { admin } = require('../../controllers/identify/admin')
const routes = Router()

routes.get('/', admin)

module.exports = routes