const { Router } = require('express')
const {
    index,
    profile,
    profilePut,
    oneGr,
    oneGrPut
} = require('../../controllers/route/routeTeachers')

const router = Router()

router.get('/', index)
router.get('/profile/:id', profile)
router.put('/profile/:id', profilePut)
router.get('/group', oneGr)
router.put('/group', oneGrPut)

module.exports = router