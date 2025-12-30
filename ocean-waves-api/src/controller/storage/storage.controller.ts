import {
  Controller,
  Post,
  Delete,
  Body,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AccessTokenAuthGuard } from 'src/middleware/access-token/access-token.guard';
import { StorageService } from 'src/service/storage/storage.service';

@Controller('storage')
@UseGuards(AccessTokenAuthGuard)
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('path') destinationPath: string = 'images/',
  ) {
    if (!file) {
      throw new Error('No file provided');
    }

    this.validateFile(file);
    return this.storageService.uploadFile(file, destinationPath);
  }

  @Post('upload-multiple')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadMultipleFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('path') destinationPath: string = 'images/',
  ) {
    if (!files || files.length === 0) {
      throw new Error('No files provided');
    }

    files.forEach((file) => this.validateFile(file));
    return this.storageService.uploadMultipleFiles(files, destinationPath);
  }

  @Delete('delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFile(@Body('path') filePath: string) {
    if (!filePath) {
      throw new Error('File path is required');
    }

    await this.storageService.deleteFile(filePath);
  }

  @Delete('delete-multiple')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMultipleFiles(@Body('paths') filePaths: string[]) {
    if (!filePaths || filePaths.length === 0) {
      throw new Error('File paths are required');
    }

    await this.storageService.deleteMultipleFiles(filePaths);
  }

  private validateFile(file: Express.Multer.File): void {
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new Error('File size must be less than 10MB');
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new Error('Only image files are allowed');
    }
  }
}

