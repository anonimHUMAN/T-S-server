const { Router } = require('express')
const {
    index,
    show,
    create,
    edit,
    remove,
    addStudentToGroup,
    removeStudentFromGroup
} = require('../../controllers/path/students')

const router = Router()

router.post('/manage', addStudentToGroup)
// http://localhost:3000/students/manage
router.delete('/manage', removeStudentFromGroup)
// http://localhost:3000/students/manage

router.get('/', index)
router.get('/:id', show)
router.post('/', create)
router.put('/:id', edit)
router.delete('/:id', remove)

module.exports = router