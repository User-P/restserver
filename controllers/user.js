const { response, request } = require('express')
const User = require('../models/user');
const bcrypt = require('bcryptjs');


const getUsers = async (req = request, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true }

    const [total, users] = await Promise.all([User.countDocuments(query),
    User.find(query)
        .skip(Number(from))
        .limit(parseInt(limit))
    ]);

    res.json({
        total,
        users
    })
}

const postUsers = async (req, res = response) => {

    const { name, email, password } = req.body;
    const user = new User({ name, email, password });

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save()
    res.status(200).json({
        user
    })
}

const putUsers = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, ...data } = req.body;

    if (password) {
        const salt = bcrypt.genSaltSync();
        data.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, data, { new: true });

    res.json({
        user
    })
}

const deleteUsers = async (req, res = response) => {

    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { status: false }, { new: true });

    res.json({ user })
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
}
