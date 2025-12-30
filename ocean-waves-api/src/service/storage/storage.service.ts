import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Storage } from '@google-cloud/storage';
import * as path from 'path';

export interface UploadFileResult {
  url: string;
  path: string;
  fileName: string;
}

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly storage: Storage;
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    const serviceAccountPath =
      this.configService.get<string>('GCS_SERVICE_ACCOUNT_PATH') ||
      path.join(process.cwd(), 'vital-wavelet-482723-m3-17f28d4cbce7.json');
    
    const projectId =
      this.configService.get<string>('GCS_PROJECT_ID') || 'vital-wavelet-482723-m3';
    
    this.bucketName = this.configService.get<string>('GCS_BUCKET_NAME') || 'ocean-waves-storage';

    this.storage = new Storage({
      keyFilename: serviceAccountPath,
      projectId,
    });

    this.logger.log(`Google Cloud Storage initialized with bucket: ${this.bucketName}`);
    this.logger.log(`Using service account: ${serviceAccountPath}`);
  }

  async uploadFile(
    file: Express.Multer.File,
    destinationPath: string,
  ): Promise<UploadFileResult> {
    try {
      const bucket = this.storage.bucket(this.bucketName);
      const fileName = this.generateUniqueFileName(file.originalname);
      const filePath = `${destinationPath}${fileName}`;
      const fileRef = bucket.file(filePath);

      const stream = fileRef.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
        resumable: false,
      });

      return new Promise((resolve, reject) => {
        stream.on('error', (error) => {
          this.logger.error(`Upload failed for ${filePath}:`, error);
          reject(new Error(`File upload failed: ${error.message}`));
        });

        stream.on('finish', async () => {
          try {
            const url = `https://storage.googleapis.com/${this.bucketName}/${filePath}`;
            
            this.logger.log(`File uploaded successfully: ${filePath}`);
            this.logger.log(`Public URL: ${url}`);
            resolve({
              url,
              path: filePath,
              fileName,
            });
          } catch (error) {
            this.logger.error(`Failed to process uploaded file: ${filePath}`, error);
            reject(new Error(`Failed to process uploaded file: ${error instanceof Error ? error.message : 'Unknown error'}`));
          }
        });

        stream.end(file.buffer);
      });
    } catch (error) {
      this.logger.error('Upload error:', error);
      throw new Error(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async uploadMultipleFiles(
    files: Express.Multer.File[],
    destinationPath: string,
  ): Promise<UploadFileResult[]> {
    const uploadPromises = files.map((file) => this.uploadFile(file, destinationPath));
    return Promise.all(uploadPromises);
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      const bucket = this.storage.bucket(this.bucketName);
      const fileRef = bucket.file(filePath);
      
      await fileRef.delete();
      this.logger.log(`File deleted successfully: ${filePath}`);
    } catch (error) {
      this.logger.error(`Failed to delete file: ${filePath}`, error);
      throw new Error(`File deletion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async deleteMultipleFiles(filePaths: string[]): Promise<void> {
    const deletePromises = filePaths.map((path) => this.deleteFile(path));
    await Promise.all(deletePromises);
  }

  async getFileUrl(filePath: string): Promise<string> {
    const bucket = this.storage.bucket(this.bucketName);
    const fileRef = bucket.file(filePath);
    
    const [exists] = await fileRef.exists();
    if (!exists) {
      throw new Error(`File not found: ${filePath}`);
    }

    return `https://storage.googleapis.com/${this.bucketName}/${filePath}`;
  }

  async fileExists(filePath: string): Promise<boolean> {
    try {
      const bucket = this.storage.bucket(this.bucketName);
      const fileRef = bucket.file(filePath);
      const [exists] = await fileRef.exists();
      return exists;
    } catch (error) {
      this.logger.error(`Error checking file existence: ${filePath}`, error);
      return false;
    }
  }

  private generateUniqueFileName(originalName: string): string {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = originalName.split('.').pop() || '';
    return `${timestamp}_${randomString}.${fileExtension}`;
  }
}

