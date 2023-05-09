const { Router } = require('express')
const {
    index,
    show,
    create,
    edit,
    remove
} = require('../controllers/students')

const router = Router()

router.get('/', index)
router.get('/:id', show)
router.post('/', create)
router.put('/:id', edit)
router.delete('/:id', remove)

module.exports = router