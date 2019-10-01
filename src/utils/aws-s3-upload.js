const multer = require('multer');
const sharp = require('sharp');
const S3 = require('aws-sdk/clients/s3');

const s3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    Bucket: process.env.AWS_BUCKET
  }
});

/**
 * Create multer upload for images
 */
const imageUpload = multer({
  limits: {
    fileSize: 1024 * 1024 * 6
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
      return cb(new Error('File must be an image file'));
    }
    cb(undefined, true);
  }
});

/**
 * Request the head object to see if the filename exists
 */
const filenameExists = async filename => {
  return s3
    .headObject(
      {
        Bucket: process.env.AWS_BUCKET,
        Key: filename
      },
      (err, data) => {
        if (err) {
          return false;
        }
        return true;
      }
    )
    .promise();
};

/**
 * If the filename exists, append a date string so original won't be overwritten
 */
const uniqueFilename = async filename => {
  const exists = await filenameExists(filename);

  if (exists) {
    const ext = filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
    return filename.replace(/\.[^/.]+$/, `_${Date.now()}.${ext}`);
  }

  return filename;
};

const uploadFiles = async files => {
  return await Promise.all(
    files.map(async file => {
      const buffer = await sharp(file.buffer)
        .resize({ width: 250, height: 250 })
        .png()
        .toBuffer();

      file.fileName = file.originalname.replace(/\.[^/.]+$/, '.png');
      file.fileName = await uniqueFilename(file.fileName);

      return new Promise(function(resolve, reject) {
        s3.upload(
          {
            Bucket: process.env.AWS_BUCKET,
            ContentType: 'image/png',
            Key: file.fileName,
            Body: buffer
          },
          (err, data) => {
            if (err) {
              reject(err);
            }
            file.key = data.Key;
            file.location = data.Location;
            resolve(file);
          }
        );
      });
    })
  );
};

module.exports = { imageUpload, uploadFiles };
