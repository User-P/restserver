const hasRole = require('../middlewares/validateRol')
const validate = require('../middlewares/validate')
const validateToken = require('../middlewares/validateToken')
const validateFile = require('../middlewares/validateFile')

module.exports = {
    ...hasRole,
    ...validate,
    ...validateToken,
    ...validateFile
}
