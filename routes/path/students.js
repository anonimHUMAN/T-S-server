const { Router } = require('express')
const {
    index,
    show,
    create,
    edit,
    remove,
    profileSt,
    oneScore
} = require('../../controllers/path/students')

const router = Router()

// http://localhost:3000/students/profilest
router.get('/profilest', profileSt)
// http://localhost:3000/students/onescore
router.get('/onescore', oneScore)

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