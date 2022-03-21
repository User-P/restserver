const { Router } = require('express')
const { check } = require('express-validator')
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/product')

const { validate, validateToken, isAdmin, hasRole, } = require('../middlewares')

const { existCategory } = require('../helpers/validatorsDB')

const router = Router()

router.get('/', [validateToken, isAdmin], getProducts)
router.get('/:id', [validateToken, isAdmin], getProduct)
router.post('/', [validateToken, isAdmin,
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    check('category', 'Category not found').isMongoId(),
    check('category').custom(existCategory),
    validate], createProduct)
router.put('/:id', [validateToken, isAdmin], updateProduct)
router.delete('/:id', [validateToken, isAdmin], deleteProduct)


module.exports = router 