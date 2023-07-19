const { Router } = require('express')
const {
    index,
    show,
    create,
    edit,
    remove,
    students,
    crStudent,
    addStudentToGroup,
    removeStudentFromGroup,
    editPass
} = require('../../controllers/path/teachers')
const { token } = require('../../middleware/token')

const router = Router()

// http://localhost:3000/teachers/manage
router.post('/manage', addStudentToGroup)
// http://localhost:3000/teachers/manage
router.delete('/manage', removeStudentFromGroup)

router.post('/password', editPass)

// http://localhost:3000/teachers/students
router.get('/students', students)

// http://localhost:3000/teachers/crstudent
router.post('/crstudent', crStudent)

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