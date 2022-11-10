require('dotenv').config()
const shortId = require('shortid');
const { S3Client } = require('@aws-sdk/client-s3');
const multerS3 = require("multer-s3");
const multer = require('multer');


const s3 = new S3Client({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, "teste" + shortId.generate() + file.originalname);
        },
    }),
    fileFilter: (req, file, cb) => {
        console.log(file);
        const type = ['application/vnd.rar', 'application/x-7z-compressed', 'application/zip','application/octet-stream']
        const extensaoImg = type.find(formatoAceito => formatoAceito == file.mimetype)

        if (extensaoImg) {
            return cb(null, true)
        }
        return cb(null, false)
    }
});

module.exports = upload