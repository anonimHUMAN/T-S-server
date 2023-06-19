const { Router } = require('express')
const {
    index, create,
} = require('../controllers/index')

const router = Router()

router.get('/', index)

module.exports = router