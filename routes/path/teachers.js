const { Router } = require('express')
const {
    index,
    show,
    create,
    edit,
    remove
} = require('../../controllers/path/teachers')

const router = Router()

// http://localhost:3000/teachers
router.get('/', index)
// http://localhost:3000/teachers/id for teacher
router.get('/:id', show)
// http://localhost:3000/teachers
router.post('/', create)
// http://localhost:3000/teachers/id for teacher
router.put('/:id', edit)
// http://localhost:3000/teachers/id for teacher
router.delete('/:id', remove)

module.exports = router