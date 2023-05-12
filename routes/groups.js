const { Router } = require('express')
const {
    index,
    show,
    create,
    edit,
    remove,
    test
} = require('../controllers/groups')

const router = Router()

router.get('/', index)
// http://localhost:3000/groups?idTeacher=6454bca9541ea2c365e58dbb
router.get('/:id', show)
// http://localhost:3000/groups/645d03daf5f09148a522619f?idTeacher=6454bca9541ea2c365e58dbb
router.post('/', create)
// http://localhost:3000/groups?idTeacher=6454bca9541ea2c365e58dbb
router.put('/:id', edit)
// http://localhost:3000/groups/645d042cf5f09148a52261b8?idTeacher=6454bca9541ea2c365e58dbb
router.delete('/', remove)
// http://localhost:3000/groups?idTeacher=6454bca9541ea2c365e58dbb&idGroup=645dff68cff4a5fdadee92b1

module.exports = router