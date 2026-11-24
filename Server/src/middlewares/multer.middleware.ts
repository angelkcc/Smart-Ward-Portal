
import multer from "multer";
import fs from "fs";
import { Request } from "express";

const multerFileUploader = () => {
  const folder = "uploads/";
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  // Disk storage
  const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
      cb(null, folder);
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
      const fileName = Date.now() + "-" + file.originalname;
      cb(null, fileName);
    },
  });

  // File filter
  const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG and WEBP images are allowed."));
    }
  };

  // Multer upload instance
  const upload = multer({
    storage: storage,
    limits: { fileSize: maxFileSize },
    fileFilter: fileFilter,
  });

  return upload;
};

export default multerFileUploader;
