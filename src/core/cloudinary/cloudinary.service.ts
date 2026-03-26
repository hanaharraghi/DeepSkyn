<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

// Use require to avoid import/module errors with streamifier
=======
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

// Using require to bypass streamifier type issues
>>>>>>> 575955a (backend v2.2)
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
<<<<<<< HEAD
  
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
=======
  private readonly logger = new Logger(CloudinaryService.name);

  constructor(private configService: ConfigService) {
    const cloudName = this.configService.get<string>('CLOUDINARY_NAME');
    const apiKey = this.configService.get<string>('CLOUDINARY_API_KEY');
    const apiSecret = this.configService.get<string>('CLOUDINARY_API_SECRET');

    this.logger.log('Initializing Cloudinary for: ' + cloudName);

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
>>>>>>> 575955a (backend v2.2)
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
<<<<<<< HEAD
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
=======
      this.logger.log('Starting upload for: ' + file.originalname);

      const upload = cloudinary.uploader.upload_stream(
        { folder: 'deepskyn_analysis' },
        (error, result) => {
          if (error) {
            this.logger.error('Cloudinary Error: ' + error.message);
            return reject(error);
          }
          if (!result) {
            this.logger.error('Cloudinary returned no result');
            return reject(new Error('Upload result is undefined'));
          }

          this.logger.log('Upload Success! Public ID: ' + result.public_id);
          resolve(result);
        },
      );

      if (!file.buffer) {
        return reject(new Error('File buffer is empty'));
      }

>>>>>>> 575955a (backend v2.2)
      streamifier.createReadStream(file.buffer).pipe(upload);
    });
  }
}