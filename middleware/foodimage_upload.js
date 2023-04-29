const multer = require('multer');
const uuid = require('uuid');

const storage = multer.diskStorage({
    destination:function(req,file,cb) {
        cb(null, 'foodimages');
    },
    filename:function(req,file,cb){
        const originalName = file.originalname;
        const nameArray = originalName.split('.');
        const extension = nameArray[nameArray.length - 1];

        const newFileName = uuid.v1() + "." + extension;

        cb(null, newFileName);

    },
});

const foodimageupload = multer({
    storage:storage
});

module.exports = foodimageupload;