const { Router } = require('express')
const { check } = require('express-validator')

const { getCategories, getCategory, deleteCategory, updateCategory, createCategory } = require('../controllers/category')
const { existCategory } = require('../helpers/validatorsDB')

const { validate, validateToken, isAdmin, hasRole, } = require('../middlewares')

const router = Router()


router.get('/', getCategories)

router.post('/', [
    validateToken,
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    validate
], createCategory)

router.delete('/:id', [
    validateToken,
    isAdmin,
    // hasRole('admin', 'user'),
    check('id').custom(existCategory),
    validate
], deleteCategory)

router.put('/:id', [
    validateToken,
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('id').custom(existCategory),
    validate
], updateCategory)

router.get('/:id', [
    validateToken,
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(existCategory),
    validate
], getCategory)

module.exports = router