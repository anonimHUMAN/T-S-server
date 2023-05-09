const { Router } = require('express')
const {
    index,
    show,
    create,
    edit,
    remove
} = require('../controllers/teachers')

const router = Router()

router.get('/', index)
router.get('/:id', show)
router.post('/', create)
router.delete('/:id', remove)
router.put('/:id', edit)

module.exports = router