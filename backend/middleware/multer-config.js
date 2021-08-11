const multer = require('multer'); 

// Dictionnary to access the MIME Type of the img

const MIME_TYPES = {
    'image/jpg': 'jpg', 
    'image/jpeg': 'jpg', 
    'image/png': 'png',
}

// Middleware to save a img

const storage = multer.diskStorage({
    destination:  (req, file, callback) =>{
        callback(null, 'images')
    }, 
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_'); 
        const extension = MIME_TYPES[file.mimetype]; 
        callback(null, name + Date.now() + '.' + extension)
    }
})

module.exports = multer({ storage }).single('avatar'); 