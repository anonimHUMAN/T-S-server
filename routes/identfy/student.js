const { Router } = require('express')
const { student } = require('../../controllers/identify/student')

const routes = Router()

routes.get('/', student)

module.exports = routes