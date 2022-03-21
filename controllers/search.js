const { response } = require("express");
const { ObjectId } = require('mongoose').Types

const { User, Product, Category } = require('../models')

const collectionsAllowed = ['users', 'categories', 'products'];

const searchUsers = async (word = '', res = response) => {
    const isMongoId = ObjectId.isValid(word);

    if (isMongoId) {
        const user = await User.findById(word);
        return res.json({
            results: user ? [user] : [],
        });
    }

    const regex = new RegExp(word, 'i');

    const users = await User.find({
        $or: [{ name: regex },
        { email: regex }],
        $and: [{ status: true }]
    });

    return res.json({
        results: users,
    });
}

const searchCategories = async (word = '', res = response) => {
    const isMongoId = ObjectId.isValid(word);

    if (isMongoId) {
        const category = await Category.findById(word);
        return res.json({
            results: category ? [category] : [],
        });
    }

    const regex = new RegExp(word, 'i');

    const categories = await Category.find({
        $or: [{ name: regex }],
        $and: [{ status: true }]
    });

    return res.json({
        results: categories,
    });
}

const searchProducts = async (word = '', res = response) => {
    const isMongoId = ObjectId.isValid(word);

    if (isMongoId) {
        const product = await Product.findById(word).populate('category', 'name');
        return res.json({
            results: product ? [product] : [],
        });
    }

    const regex = new RegExp(word, 'i');

    const products = await Product.find({
        $or: [{ name: regex }],
        $and: [{ status: true }]
    }).populate('category', 'name');

    return res.json({
        results: products,
    });
}

const search = (req, res = response) => {
    const { collection, word } = req.params;

    if (!collectionsAllowed.includes(collection)) {
        return res.status(400).json({
            message: 'collection not allowed',
        });
    }

    switch (collection) {
        case 'users':
            searchUsers(word, res);
            break;
        case 'categories':
            searchCategories(word, res);
            break;
        case 'products':
            searchProducts(word, res);
            break;
        default:
            res.status(500).json({
                message: 'word not allowed',
            });

    }
}
module.exports = {
    search
}
