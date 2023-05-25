const { Router } = require('express')
const {
    index,
    profile,
    profilePut,
    oneGr,
    oneGrPut
} = require('../../controllers/route/routeTeachers')

const router = Router()

// http://localhost:3000/routeTeacher?idTeacher=teacher id
router.get('/', index)
// http://localhost:3000/routeTeacher/profile/teacher id
router.get('/profile/:id', profile)
// http://localhost:3000/routeTeacher/profile/teacher id
router.put('/profile/:id', profilePut)
// http://localhost:3000/routeTeacher/group?idTeacher=teacher id&idGroup=group id
router.get('/group', oneGr)
// http://localhost:3000/routeTeacher/group?idTeacher=id teacher&idGroup=id group
router.put('/group', oneGrPut)

module.exports = router