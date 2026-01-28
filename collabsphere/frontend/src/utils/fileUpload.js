/**
 * File Upload Utility
 * Handles file uploads to storage (Cloudinary or local)
 */

// For demo purposes, we'll simulate upload with URL generation
// In production, integrate with Cloudinary or backend upload endpoint

/**
 * Upload file to storage and return URL
 * @param {File} file - File object to upload
 * @param {Function} onProgress - Progress callback (percentage)
 * @returns {Promise<string>} - URL of uploaded file
 */
export const uploadFile = async (file, onProgress) => {
  return new Promise((resolve, reject) => {
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (onProgress) {
        onProgress(progress);
      }

      if (progress >= 100) {
        clearInterval(interval);
        // In demo, return a mock URL
        // In production, use actual Cloudinary response
        const mockUrl = `https://res.cloudinary.com/demo/image/upload/${file.name}`;
        resolve(mockUrl);
      }
    }, 200);

    // Simulate error (5% chance)
    if (Math.random() < 0.05) {
      clearInterval(interval);
      reject(new Error('Upload failed'));
    }
  });
};

/**
 * Upload file to Cloudinary
 * @param {File} file - File to upload
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Object>} - Cloudinary response with url, public_id, etc.
 */
export const uploadToCloudinary = async (file, onProgress) => {
  // TODO: Implement actual Cloudinary upload
  // This requires backend endpoint that accepts multipart/form-data
  // and forwards to Cloudinary with proper credentials

  // For now, simulate with mock URL
  return uploadFile(file, onProgress);
};

/**
 * Upload multiple files
 * @param {File[]} files - Array of files
 * @param {Function} onProgress - Progress callback for each file
 * @returns {Promise<string[]>} - Array of URLs
 */
export const uploadMultipleFiles = async (files, onProgress) => {
  const uploads = files.map(async (file, index) => {
    const url = await uploadFile(file, (percent) => {
      if (onProgress) {
        onProgress(index, percent);
      }
    });
    return url;
  });

  return Promise.all(uploads);
};

/**
 * Get file type from MIME type
 * @param {string} mimeType - File MIME type
 * @returns {string} - Resource type (document, video, image, code, other)
 */
export const getResourceType = (mimeType) => {
  if (!mimeType) return 'other';

  if (mimeType.includes('pdf') || mimeType.includes('msword') || 
      mimeType.includes('wordprocessingml') || mimeType.includes('spreadsheet') ||
      mimeType.includes('presentation')) {
    return 'document';
  }

  if (mimeType.startsWith('video/')) {
    return 'video';
  }

  if (mimeType.startsWith('image/')) {
    return 'image';
  }

  if (mimeType.includes('javascript') || mimeType.includes('html') || 
      mimeType.includes('css') || mimeType.includes('json') ||
      mimeType.includes('python') || mimeType.includes('java')) {
    return 'code';
  }

  return 'other';
};

/**
 * Validate file before upload
 * @param {File} file - File to validate
 * @param {number} maxSize - Max size in bytes (default 10MB)
 * @returns {Object} - { valid: boolean, error?: string }
 */
export const validateFile = (file, maxSize = 10485760) => {
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  if (file.size > maxSize) {
    const maxMB = (maxSize / 1024 / 1024).toFixed(0);
    return { valid: false, error: `File size exceeds ${maxMB}MB limit` };
  }

  // Add more validation as needed (file type, name, etc.)
  return { valid: true };
};

export default {
  uploadFile,
  uploadToCloudinary,
  uploadMultipleFiles,
  getResourceType,
  validateFile,
};
