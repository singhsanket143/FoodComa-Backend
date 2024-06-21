const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir=process.cwd() + '/uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

const storageConfiguration = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, uploadDir)
    },
    filename: (req, file, next) => {
        console.log(file);
        next(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
});
const uploader = multer({storage: storageConfiguration});

module.exports = uploader;