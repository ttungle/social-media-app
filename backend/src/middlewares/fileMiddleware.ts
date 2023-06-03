import { AppError } from '../utils';
import multer from 'multer';

const multerStorage = (destination: string = './public/image', prefix: string) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split('/')[1];

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${prefix}-${file.fieldname}-${req.user.id}-${uniqueSuffix}.${ext}`);
    },
  });

const multerFilter = (filterExtension: 'image') => (req, file, cb) => {
  if (file.mimetype.startsWith(filterExtension)) {
    cb(null, true);
  } else {
    cb(new AppError(`Not an image! Please upload only ${filterExtension}.`, 400), false);
  }
};

export const uploadInit = (destination: string, prefix: string, filterExtension: 'image') =>
  multer({
    storage: multerStorage(destination, prefix),
    fileFilter: multerFilter(filterExtension),
  });
