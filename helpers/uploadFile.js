const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, validExtensions = ['png', 'jpg', 'gif', 'jpeg'], folder = '') => {

    return new Promise((resolve, reject) => {

        const { file } = files;
        const nameFile = file.name.split('.');
        const extension = nameFile[nameFile.length - 1];

        if (validExtensions.indexOf(extension) < 0) {
            return reject('Extension not valid');
        }

        const id = uuidv4();
        const fileName = `${id}.${extension}`;

        const uploadPath = path.join(__dirname, '../uploads/', folder, fileName)

        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve(fileName);
        });

    });

}

module.exports = {
    uploadFile
}