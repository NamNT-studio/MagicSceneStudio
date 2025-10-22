
import React, { useCallback, useState } from 'react';
import { UploadIcon } from './icons';

interface FileUploadProps {
  onImageUpload: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };
  
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  }, [onImageUpload]);

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div 
        className={`w-full max-w-2xl h-96 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center transition-colors duration-300 ${isDragging ? 'border-brand-primary bg-dark-surface/50' : 'border-dark-border'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload" className="cursor-pointer p-8">
          <UploadIcon className="w-16 h-16 mx-auto text-dark-text-secondary" />
          <h2 className="mt-4 text-xl font-semibold text-dark-text-primary">
            Drag & Drop your photo here
          </h2>
          <p className="mt-2 text-dark-text-secondary">
            or click to browse
          </p>
          <p className="mt-1 text-xs text-dark-text-secondary/70">
            PNG, JPG, WEBP supported
          </p>
        </label>
      </div>
    </div>
  );
};
