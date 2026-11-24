
import cloudinary from "../config/cloudinary.config";
import AppError from "./appError.utlis";
import fs from "fs";

// Upload image to Cloudinary
export const uploadFileToCloudinary = async (
  file: Express.Multer.File,
  dir = "/",
) => {
  try {
    const folder = "smart_ward_portal" + dir;

    const { public_id, secure_url: path } =
      await cloudinary.uploader.upload(file.path, {
        folder,
        unique_filename: true,
        resource_type: "image",
      });

    // Delete temporary local file after successful upload
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    return {
      path,
      public_id,
    };
  } catch (error) {
    console.log(error);

    // Clean up temporary file if upload fails
    if (file.path && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    throw new AppError("Image upload failed", 400);
  }
};

// Delete image from Cloudinary
export const deleteFileFromCloudinary = async (
  public_id: string,
) => {
  try {
    if (!public_id) return false;

    const result = await cloudinary.uploader.destroy(public_id);

    return result.result === "ok";
  } catch (error) {
    console.log(error);
    throw new AppError("Image deletion failed", 400);
  }
};
