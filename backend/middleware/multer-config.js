const multer = require('multer')

const mimeType = {
    'image/jpg': 'jpg', 
    'image/jpeg': 'jpg', 
    'image/png': 'png',
}

const storage = multer.diskStorage({
    destination: (req, file, cb ) => {
        cb(null, 'images')
    }, 
    filename: (req, file, cb) => {
        const name = file.originalname.split('').join('_')
        const extension = mimeType[file.mimetype]
        cb(null, name + Date.now() + '.' + extension)
    }
})

module.exports = multer({storage}).single('image')