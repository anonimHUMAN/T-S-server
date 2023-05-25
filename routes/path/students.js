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

// http://localhost:3000/students/manage
router.post('/manage', addStudentToGroup)
// http://localhost:3000/students/manage
router.delete('/manage', removeStudentFromGroup)


// http://localhost:3000/students
router.get('/', index)
// http://localhost:3000/students/id for student
router.get('/:id', show)
// http://localhost:3000/students
router.post('/', create)
// http://localhost:3000/students/id for student
router.put('/:id', edit)
// http://localhost:3000/students/id for student
router.delete('/:id', remove)

module.exports = router