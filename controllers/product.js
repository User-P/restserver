const { response, request } = require('express')
const { Product } = require('../models')

const getProducts = async (req, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true }

    const [total, products] = await Promise.all([Product.countDocuments(query),
    Product.find(query)
        .skip(Number(from))
        .limit(parseInt(limit))
    ]);

    res.json({
        total,
        products
    })
}

const getProduct = async (req, res = response) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    res.json({
        product
    })
}

const createProduct = async (req, res = response) => {
    const { name, price, category, description } = req.body;
    const product = new Product({
        name,
        price,
        category,
        description,
        user: req.user._id
    });

    await product.save();

    res.json({
        product,
    })
}

const updateProduct = async (req, res = response) => {
    const { id } = req.params;
    const { name, price, category, description } = req.body;
    const product = await Product.findByIdAndUpdate(id, { name, price, category, description }, { new: true });

    res.json({
        product
    })
}

const deleteProduct = async (req, res = response) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, { status: false }, { new: true });

    res.json({
        product
    })
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}


