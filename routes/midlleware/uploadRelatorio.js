const  { uuid } = require("uuidv4");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const path = require("path");

aws.config.update({
    accessKeyId: "",
    secretAccessKey: "",
    region: "",
})

const s3 = new aws.S3();

const upload = multer({
    Storage: multerS3({
        s3,
        bucket: "",
        acl: "public-read", 
        key(req, file, callback){
            callback(null, uuid() + path.extname(file.originalname))
        }
    })
})

module.exports = upload