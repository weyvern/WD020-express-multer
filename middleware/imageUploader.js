import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const isPicture = ({ originalname, mimetype }) => {
  const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
  return (
    allowedTypes.includes(mimetype) && originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)
  );
};

const fileFilter = (req, file, cb) => {
  if (!isPicture(file)) {
    return cb(new Error('Yep nope'));
  }
  return cb(null, true);
};

const upload = multer({ storage, fileFilter });

export default upload;
