const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const url = require('../config');
const crypto = require('crypto');

// var storage = new GridFsStorage({
//   url: url,
//   options: { useNewUrlParser: true, useUnifiedTopology: true },
//   file: (req, file) => {
//     console.log("WELL HERE WE ARE LINE 10 UPLOAD.JS")
//     return new Promise((resolve, reject)   =>  {





//     })
//     const match = ["image/png", "image/jpeg"];
//     if (match.indexOf(file.mimetype) === -1) {
//       const filename = `${Date.now()}-${file.originalname}`;
//       return filename;
//     }
//     return {
//       bucketName: "photos",
//       // filename: `${Date.now()}-${file.originalname}`
//       filename: file.originalname, 
//     };
//   }
// });

const storage = new GridFsStorage({
  url: url,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
      return new Promise((resolve, reject) => {
          crypto.randomBytes(16, (err, buf) => {
              if (err) {
                  return reject(err);
              }
              const filename = buf.toString('hex') + file.originalname;
              const fileInfo = {
                  filename: filename,
                  bucketName: 'uploads'
              };
              resolve(fileInfo);
          });
      });
  }
});

module.exports = multer({storage});