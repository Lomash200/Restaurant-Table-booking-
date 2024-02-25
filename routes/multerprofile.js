const multer = require('multer');         //it provide functionality to upload a file from our pc
const { v4: uuidv4 } = require('uuid');   //it rename the upload files and give a unique name to each file
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/profilepic')    
    },
    filename: function(req, file, cb) {
        const uniqueFilename = uuidv4();
        cb(null, uniqueFilename+path.extname(file.originalname));    //path.extname extract the extension from any text and file.originalname have the original name of the file
    }
});

const uploadprofile = multer({storage: storage});
module.exports = uploadprofile;