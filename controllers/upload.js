
const { response } = require("express")
const { uploadFile } = require('../helpers');
const { User, Product, Category } = require("../models");
const path = require('path')
const fs = require('fs');

const uploadImage = async (req, res = response) => {

    try {
        const fileName = await uploadFile(req.files)
        res.json({ fileName })
    } catch (error) {
        res.status(500).json(error)
    }

}

const updateImage = async (req, res = response) => {
    const { id, collection } = req.params

    let model

    switch (collection) {
        case 'users':
            model = await User.findById(id)
            if (!model) return res.status(404).json({ message: 'User not found' })
            break;
        case 'products':
            model = await Product.findById(id)
            if (!model) return res.status(404).json({ message: 'Product not found' })
            break;
        case 'categories':
            model = await Category.findById(id)
            if (!model) return res.status(404).json({ message: 'Category not found' })
            break;
        default:
            return res.status(400).json('The collection not permitted')
    }

    if (model.image) {
        const imagePath = path.join(__dirname, '../uploads', collection, model.image)
        if (fs.existsSync(imagePath))
            fs.unlinkSync(imagePath)
    }

    const name = await uploadFile(req.files, undefined, collection)
    model.image = name
    await model.save()
    res.json({ model })
}

const getImage = async (req, res = response) => {
    const { collection, id } = req.params

    let model

    switch (collection) {
        case 'users':
            model = await User.findById(id)
            if (!model) return res.status(404).json({ message: 'User not found' })
            break;
        case 'products':
            model = await Product.findById(id)
            if (!model) return res.status(404).json({ message: 'Product not found' })
            break;
        case 'categories':
            model = await Category.findById(id)
            if (!model) return res.status(404).json({ message: 'Category not found' })
            break;
        default:
            return res.status(400).json('The collection not permitted')
    }

    if (model.image) {
        const imagePath = path.join(__dirname, '../uploads', collection, model.image)
        if (fs.existsSync(imagePath))
            return res.sendFile(imagePath)
    }
    const patNotFound = path.join(__dirname, '../assets', '404.jpg')
    res.sendFile(patNotFound)
}

module.exports = {
    uploadImage,
    updateImage,
    getImage
}