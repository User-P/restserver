const { response, request } = require('express')
const { Category } = require('../models')

const getCategories = async (req = request, res = response) => {
    const categories = await Category.find({ status: true })

    res.json({
        categories
    })
}

const deleteCategory = async (req = request, res = response) => {
    const { id } = req.params

    const category = await Category.findById(id, { status: true })

    category.status = false
    await category.save()
    res.json({
        msg: 'Category deleted'
    })
}

const createCategory = async (req = request, res = response) => {
    const { name, description } = req.body
    const categoryDB = await Category.findOne({ name })

    if (categoryDB)
        return res.status(400).json({
            msg: 'Category already exists'
        })

    const category = new Category({
        name,
        description,
        user: req.user._id
    })

    await category.save()
    res.json({
        msg: 'Category created'
    })
}


const updateCategory = async (req = request, res = response) => {
    const { id } = req.params
    const { name, description } = req.body
    const category = await Category.findById(id, { status: true })

    category.name = name
    category.description = description
    await category.save()
    res.json({
        msg: 'Category updated'
    })
}

const getCategory = async (req = request, res = response) => {
    const { id } = req.params
    const category = await Category.findById(id, { status: true }).populate('user', 'name')

    res.json({
        category
    })
}

module.exports = {
    getCategories,
    deleteCategory,
    createCategory,
    updateCategory,
    getCategory
}