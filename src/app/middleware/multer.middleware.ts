import { Request } from 'express';
import multer from 'multer';
const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    cb(null, './src/public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

export const upload = multer({ storage });
