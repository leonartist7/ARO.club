import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, AlertCircle, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

/**
 * Image Upload component with drag-and-drop, preview, and validation
 *
 * @param {function} onUpload - Callback function when image is uploaded (receives file/url)
 * @param {string} currentImage - Current image URL to display
 * @param {number} maxSizeMB - Maximum file size in MB (default: 5)
 * @param {string[]} acceptedFormats - Accepted image formats (default: ['image/jpeg', 'image/png', 'image/webp'])
 * @param {string} aspectRatio - CSS aspect ratio (e.g., '1/1', '16/9')
 * @param {boolean} showPreview - Show preview of uploaded image (default: true)
 * @param {string} className - Additional CSS classes
 */
export default function ImageUpload({
  onUpload,
  currentImage,
  maxSizeMB = 5,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'],
  aspectRatio = '1/1',
  showPreview = true,
  className = '',
  label = 'Upload Image',
}) {
  const [preview, setPreview] = useState(currentImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    // Check file type
    if (!acceptedFormats.includes(file.type)) {
      const formats = acceptedFormats.map(f => f.split('/')[1].toUpperCase()).join(', ');
      return `Invalid file type. Please upload ${formats} images only.`;
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      return `File size must be less than ${maxSizeMB}MB. Your file is ${fileSizeMB.toFixed(2)}MB.`;
    }

    return null;
  };

  const handleFileSelect = async (file) => {
    setError('');
    setSuccess(false);

    // Validate file
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Simulate upload to storage
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In production, would upload to Supabase Storage:
      // const fileExt = file.name.split('.').pop();
      // const fileName = `${Math.random()}.${fileExt}`;
      // const filePath = `avatars/${fileName}`;
      //
      // const { data, error } = await supabase.storage
      //   .from('images')
      //   .upload(filePath, file);
      //
      // if (error) throw error;
      //
      // const { data: { publicUrl } } = supabase.storage
      //   .from('images')
      //   .getPublicUrl(filePath);

      console.log('File uploaded:', {
        name: file.name,
        size: file.size,
        type: file.type,
      });

      // Call onUpload callback
      if (onUpload) {
        // In production, would pass the publicUrl from Supabase
        // For now, passing the file itself
        onUpload(file, reader.result);
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload image. Please try again.');
      setPreview(currentImage || null);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setError('');
    setSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onUpload) {
      onUpload(null, null);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative rounded-lg border-2 border-dashed transition-all ${
          isDragging
            ? 'border-primary-500 bg-primary-50'
            : error
            ? 'border-red-300 bg-red-50'
            : success
            ? 'border-green-300 bg-green-50'
            : 'border-gray-300 bg-gray-50'
        }`}
        style={{ aspectRatio: aspectRatio }}
      >
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.join(',')}
          onChange={handleFileInputChange}
          className="hidden"
        />

        {/* Preview or Upload UI */}
        <AnimatePresence mode="wait">
          {preview && showPreview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative w-full h-full group"
            >
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleClick}
                  disabled={loading}
                  className="bg-white text-gray-900"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Change
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleRemove}
                  disabled={loading}
                  className="bg-white text-red-600 hover:bg-red-50"
                >
                  <X className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>

              {/* Loading overlay */}
              {loading && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
                  <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
                </div>
              )}

              {/* Success indicator */}
              {success && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <Check className="w-5 h-5 text-white" />
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col items-center justify-center p-6 cursor-pointer"
              onClick={handleClick}
            >
              {loading ? (
                <>
                  <Loader2 className="w-12 h-12 text-primary-500 animate-spin mb-3" />
                  <p className="text-sm font-medium text-gray-700">Uploading...</p>
                  <p className="text-xs text-gray-500 mt-1">Please wait</p>
                </>
              ) : isDragging ? (
                <>
                  <Upload className="w-12 h-12 text-primary-500 mb-3" />
                  <p className="text-sm font-medium text-gray-700">Drop image here</p>
                </>
              ) : (
                <>
                  <ImageIcon className="w-12 h-12 text-gray-400 mb-3" />
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    {acceptedFormats.map(f => f.split('/')[1].toUpperCase()).join(', ')} up to {maxSizeMB}MB
                  </p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md flex items-start gap-2"
        >
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-red-700">{error}</p>
        </motion.div>
      )}

      {/* Success message */}
      {success && !error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md flex items-center gap-2"
        >
          <Check className="w-4 h-4 text-green-500" />
          <p className="text-xs text-green-700 font-medium">Image uploaded successfully!</p>
        </motion.div>
      )}

      {/* Helper text */}
      {!error && !success && (
        <p className="mt-2 text-xs text-gray-500">
          Recommended: Square image, at least 400x400px for best quality
        </p>
      )}
    </div>
  );
}

/**
 * Example usage:
 *
 * <ImageUpload
 *   onUpload={(file, previewUrl) => {
 *     console.log('File uploaded:', file);
 *     setProfilePhoto(previewUrl);
 *   }}
 *   currentImage={profile?.photo}
 *   maxSizeMB={5}
 *   aspectRatio="1/1"
 *   label="Profile Photo"
 * />
 */
