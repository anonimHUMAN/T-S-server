const { Router } = require('express')
const {
    adminteacher,
    adminstudent,
    admin,
    addStudentToGroup,
    removeStudentFromGroup,
    editPass
} = require('../../controllers/path/admin')

const router = Router()

// http://localhost:3000/admin/manage
router.post('/manage', addStudentToGroup)
// http://localhost:3000/admin/manage
router.delete('/manage', removeStudentFromGroup)

// http://localhost:3000/admin
router.get('/', admin)
router.post('/password', editPass)
router.get('/teachers', adminteacher)
router.get('/students', adminstudent)

module.exports = router