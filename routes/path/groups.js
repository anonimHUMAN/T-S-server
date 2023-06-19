const { Router } = require('express')
const {
    index,
    show,
    create,
    edit,
    remove,
    getTeach,
    showStudents
} = require('../../controllers/path/groups')

const router = Router()


// http://localhost:3000/groups/getId
router.get('/getId', getTeach)
// http://localhost:3000/groups/id for the group?idTeacher=id for the teacher
router.get('/students/:id', showStudents)
// http://localhost:3000/groups?idTeacher=id for the teacher
router.get('/', index)
// http://localhost:3000/groups/id for the group?idTeacher=id for the teacher
router.get('/:id', show)
// http://localhost:3000/groups?idTeacher=id for the teacher
router.post('/', create)
// http://localhost:3000/groups/id for the group?idTeacher=id for the teacher
router.put('/:id', edit)
// http://localhost:3000/groups?idTeacher=id for the teacher&idGroup=id for the group
router.delete('/', remove)

module.exports = router