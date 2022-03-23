const jwt = require('jsonwebtoken');
const { User } = require('../models')

const generateToken = (uid = '') => {

    return new Promise((resolve, reject) => {
        const payload = { uid }

        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '8h'
        }, (error, token) => {
            if (error)
                reject(error)
            else
                resolve(token)

        }
        )
    })
}

const validateToken = async (token = '') => {
    try {
        if (token.length <= 10)
            throw new Error('No token')

        const { uid } = jwt.verify(token, process.env.SECRET_KEY)

        const user = await User.findById(uid)

        if (user)
            if (user.status)
                return user

        return null

    } catch {
        return null
    }
}


module.exports = {
    generateToken,
    validateToken
}