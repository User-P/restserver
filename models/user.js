const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    image: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'user'
    }

})

UserSchema.methods.toJSON = function () {
    const { password, __v, _id, ...user } = this.toObject()
    user.uid = _id
    return user
}

module.exports = model('User', UserSchema)