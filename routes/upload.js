import express from 'express';
import pkg from 'cloudinary';
import path from 'path';
import multer from 'multer';
import asyncHandler from 'express-async-handler';

import protect from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/adminMiddleware.js';

const cloudinary = pkg;
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    // store images in root uploads folder
    // cb(error, destination)
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    // cb(error, upload name)
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// check file type
function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png/;
  // check if file is a jpg, jpeg or png
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // check mime type
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  cb('Images only');
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post(
  '/',
  protect,
  isAdmin,
  upload.single('image'),
  asyncHandler(async (req, res) => {
    const uploadPhoto = await cloudinary.v2.uploader.upload(`${req.file.path}`);
    // This will give you all the information back from the uploaded photo result
    console.log(uploadPhoto);
    // This is what we want to send back now in the  res.send
    console.log(uploadPhoto.url);

    res.send(uploadPhoto.url);
  })
);

export default router;
