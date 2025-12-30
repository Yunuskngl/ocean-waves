import { protectedApiClient } from '@/app/lib/authenticated-api-interceptor/api-client-interceptor';

export interface UploadProgress {
  progress: number;
  state: 'running' | 'paused' | 'success' | 'error';
}

export interface UploadResult {
  url: string;
  path: string;
  fileName: string;
}

const API_ENDPOINTS = {
  UPLOAD: '/api/v1/storage/upload',
  UPLOAD_MULTIPLE: '/api/v1/storage/upload-multiple',
  DELETE: '/api/v1/storage/delete',
  DELETE_MULTIPLE: '/api/v1/storage/delete-multiple',
};

/**
 * Uploads an image file to Google Cloud Storage via API
 * @param file - The image file to upload
 * @param destinationPath - The storage path (e.g., "images/dashboard/")
 * @param onProgress - Optional callback for upload progress updates
 * @returns Promise that resolves with the download URL and storage path
 */
export async function uploadImage(
  file: File,
  destinationPath: string = 'images/',
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult> {
  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('Dosya bir resim dosyası olmalıdır');
  }

  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    throw new Error('Dosya boyutu 10MB\'dan küçük olmalıdır');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('path', destinationPath);

  try {
    onProgress?.({
      progress: 0,
      state: 'running',
    });

    const response = await protectedApiClient.post<UploadResult>(API_ENDPOINTS.UPLOAD, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress?.({
            progress,
            state: 'running',
          });
        }
      },
    });

    onProgress?.({
      progress: 100,
      state: 'success',
    });

    return response.data;
  } catch (error: any) {
    onProgress?.({
      progress: 0,
      state: 'error',
    });

    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Dosya yüklenirken bir hata oluştu';
    throw new Error(errorMessage);
  }
}

/**
 * Uploads multiple image files to Google Cloud Storage via API
 * @param files - Array of image files to upload
 * @param destinationPath - The storage path (e.g., "images/dashboard/")
 * @param onProgress - Optional callback for upload progress updates (receives index and progress)
 * @returns Promise that resolves with array of download URLs and storage paths
 */
export async function uploadMultipleImages(
  files: File[],
  destinationPath: string = 'images/',
  onProgress?: (index: number, progress: UploadProgress) => void
): Promise<UploadResult[]> {
  // Validate all files
  files.forEach((file) => {
    if (!file.type.startsWith('image/')) {
      throw new Error(`${file.name} bir resim dosyası olmalıdır`);
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new Error(`${file.name} dosya boyutu 10MB'dan küçük olmalıdır`);
    }
  });

  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });
  formData.append('path', destinationPath);

  try {
    files.forEach((_, index) => {
      onProgress?.(index, {
        progress: 0,
        state: 'running',
      });
    });

    const response = await protectedApiClient.post<UploadResult[]>(
      API_ENDPOINTS.UPLOAD_MULTIPLE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const totalProgress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            // Distribute progress across all files
            const progressPerFile = Math.floor(totalProgress / files.length);
            files.forEach((_, index) => {
              onProgress?.(index, {
                progress: Math.min(progressPerFile, 100),
                state: 'running',
              });
            });
          }
        },
      }
    );

    files.forEach((_, index) => {
      onProgress?.(index, {
        progress: 100,
        state: 'success',
      });
    });

    return response.data;
  } catch (error: any) {
    files.forEach((_, index) => {
      onProgress?.(index, {
        progress: 0,
        state: 'error',
      });
    });

    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Dosyalar yüklenirken bir hata oluştu';
    throw new Error(errorMessage);
  }
}

/**
 * Deletes a file from Google Cloud Storage via API
 * @param filePath - The storage path of the file to delete
 */
export async function deleteFile(filePath: string): Promise<void> {
  try {
    await protectedApiClient.delete(API_ENDPOINTS.DELETE, {
      data: { path: filePath },
    });
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Dosya silinirken bir hata oluştu';
    throw new Error(errorMessage);
  }
}

/**
 * Deletes multiple files from Google Cloud Storage via API
 * @param filePaths - Array of storage paths to delete
 */
export async function deleteMultipleFiles(filePaths: string[]): Promise<void> {
  try {
    await protectedApiClient.delete(API_ENDPOINTS.DELETE_MULTIPLE, {
      data: { paths: filePaths },
    });
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Dosyalar silinirken bir hata oluştu';
    throw new Error(errorMessage);
  }
}

