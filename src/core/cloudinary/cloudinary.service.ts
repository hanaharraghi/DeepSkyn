import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

// Use require to avoid import/module errors with streamifier
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        // Optional: you can add a folder name here
        { folder: 'deepskyn_analysis' }, 
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('Cloudinary upload result is undefined'));
          resolve(result);
        }
      );

      // This converts the file buffer into a stream that Cloudinary accepts
      streamifier.createReadStream(file.buffer).pipe(upload);
    });
  }
}