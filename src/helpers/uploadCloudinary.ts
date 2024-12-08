import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import { config } from '../config';

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) throw new Error('localFilePath is required');
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
      folder: 'attendify',
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log('Error uploading file to cloudinary', error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
