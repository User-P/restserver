const { response, request } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateToken } = require('../helpers/generateToken');
const { googleVerify } = require('../helpers/googleVerify');
const { json } = require('express/lib/response');

const login = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: 'User or password incorrect'
            });
        }

        if (!user.status)
            return res.status(400).json({
                msg: 'The user is inactive'
            });

        if (!bcryptjs.compareSync(password, user.password)) {
            return res.status(400).json({
                msg: 'User or password incorrect'
            });
        }

        const token = await generateToken(user.id);

        res.json({
            user,
            token
        });

    } catch (error) {
        return res.status(400).json({
            msg: 'Error validating user',
            errors: error
        })
    }

}

const googleSignIn = async (req = request, res = response) => {
    const { id_token } = req.body;
    try {
        const { email, name, picture } = await googleVerify(id_token)

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                name,
                email,
                password: ':P',
                img: picture,
                google: true
            });
            await user.save();
        }

        if (!user.status)
            return res.status(400).json({
                msg: 'Talk to the administrator'
            })

        const token = await generateToken(user.id);


        res.json({
            user,
            token
        });

    } catch (error) {
        res.status(400).json({
            msg: 'Error validating user',
            errors: error
        })

    }
}

const refreshToken = async (req = request, res = response) => {
    const { user } = req;

    const token = await generateToken(user.id);

    res.json({
        user,
        token
    });
}


module.exports = {
    login,
    googleSignIn,
    refreshToken
}