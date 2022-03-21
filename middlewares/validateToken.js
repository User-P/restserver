const jwt = require('jsonwebtoken');
const { request } = require('express');

const User = require('../models/user');

const validateToken = async (req = request, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRET_KEY)

        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({ msg: 'User not found' });
        }

        if (!user.status) {
            return res.status(401).json({ msg: 'User not found' });
        }

        req.user = user;

        next();

    }
    catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}

module.exports = { validateToken };

