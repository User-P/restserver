const { Category, User } = require('../models');

const emailExist = async (email) => {

    const exist = await User.findOne({ email });
    if (exist) throw new Error('The email already exists')
}

const userExist = async (id) => {
    const exist = await User.findById(id);
    if (!exist) throw new Error('The user not exist')
}

const idExist = async (id) => {
    const exist = await User.findById(id);
    if (!exist) throw new Error(`The user ${id} not exist`)
}

const existCategory = async (id) => {
    const exist = await Category.findById(id);
    if (!exist) throw new Error(`The category  ${id} not exist`)
}

const collectionsPermitted = (collection = '', permitted = []) => {
    if (permitted.indexOf(collection) < 0) throw new Error('The collection not permitted')

    return true
}


module.exports = {
    emailExist,
    userExist,
    idExist,
    existCategory,
    collectionsPermitted
}