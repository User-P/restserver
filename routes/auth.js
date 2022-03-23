const { Router } = require('express')
const { check } = require('express-validator')

const { login, googleSignIn, refreshToken } = require('../controllers/auth')
const { validateToken } = require('../middlewares')
const { validate } = require('../middlewares/validate')

const router = Router()

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password required').not().isEmpty(),
    validate
], login)

router.post('/google', [
    check('id_token', 'id_token is required').not().isEmpty(),
    validate
], googleSignIn)

router.get('/', validateToken, refreshToken)

module.exports = router

