const { Router } = require('express')
const { check } = require('express-validator')

const { uploadImage, updateImage, getImage } = require('../controllers/upload')
const { collectionsPermitted } = require('../helpers')
const { validate, validateFile } = require('../middlewares')

const router = Router()

router.post('/', validateFile, uploadImage)

router.put('/:collection/:id', [
    validateFile,
    check('id', 'Id not found').isMongoId(),
    check('collection').custom(c => collectionsPermitted(c, ['users', 'products'])),
    validate
], updateImage)

router.get('/:collection/:id', [
    check('id', 'Id not found').isMongoId(),
    check('collection').custom(c => collectionsPermitted(c, ['users', 'products'])),
    validate
], getImage)


module.exports = router 