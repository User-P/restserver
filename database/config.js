const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.URL_MONGO);
        console.log('DB is connected');
    } catch (error) {
        console.log(error);
        throw new Error('Error connecting to database');
    }
}

module.exports = {
    dbConnection
}