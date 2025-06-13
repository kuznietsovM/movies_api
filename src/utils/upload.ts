import multer from "multer";
import { FileFormatError, FormatError } from "./errors";

const storage = multer.memoryStorage()
export const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024, // 1MB max file size
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/plain') {
      cb(null, true);
    } else {
      cb(new FileFormatError(file.mimetype));
    }
  },
})