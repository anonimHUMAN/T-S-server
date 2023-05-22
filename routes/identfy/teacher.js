const { Router } = require('express')
const { teacher } = require('../../controllers/identify/teacher')

const routes = Router()

routes.get('/', teacher)

module.exports = routes