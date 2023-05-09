const { Router } = require('express')
const {
    index,
} = require('../controllers/index')

const router = Router()

router.get('/', index)

module.exports = router