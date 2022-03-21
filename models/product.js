const { Schema, model } = require('mongoose')

const ProductSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
    }

})

ProductSchema.methods.toJSON = function () {
    const { __v, status, ...data } = this.toObject()

    return data
}

module.exports = model('Product', ProductSchema)