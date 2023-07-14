const { Router } = require('express')
const {
    index,
    profile,
    profilePut,
    oneGr,
    oneGrPut,
    show3attend,
    addAttend,
    show1attend,
    totalScore
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

// http://localhost:3000/routeTeacher/attend
router.get('/total', totalScore)

// http://localhost:3000/routeTeacher/attend
router.get('/attend', show3attend)
// http://localhost:3000/routeTeacher/attend1
router.get('/attend1', show1attend)
// http://localhost:3000/routeTeacher/attend
router.post('/attend', addAttend)

module.exports = router