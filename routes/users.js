const { Router } = require('express')
const { check } = require('express-validator')

const { getUsers, postUsers, putUsers, deleteUsers } = require('../controllers/user')
const { emailExist, idExist, userExist } = require('../helpers/validatorsDB')

const { hasRole, validate, validateToken } = require('../middlewares')

const router = Router()

router.get('/', getUsers)

router.post('/', [
    check('email', 'The email is required').isEmail(),
    check('password', 'Length not allowed').isLength({ min: 6 }),
    check('name', 'name required').not().isEmpty(),
    check('email').custom(emailExist),
    validate,
], postUsers)

router.put('/:id', [
    check('id', 'The id is required').not().isEmpty(),
    check('id', 'The id not found').isMongoId(),
    check('id').custom(userExist),
    validate
], putUsers)

router.delete('/:id', [
    validateToken,
    hasRole('admin', 'user'),
    check('id', 'The id is required').not().isEmpty(),
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom(idExist),
    validate
], deleteUsers)


module.exports = router