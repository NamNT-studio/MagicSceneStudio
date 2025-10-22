
import React from 'react';
import type { ImageState } from '../types';
import { SpinnerIcon } from './icons';

interface CanvasProps {
  image: ImageState | null;
  isLoading: boolean;
  error: string | null;
}

export const Canvas: React.FC<CanvasProps> = ({ image, isLoading, error }) => {
  return (
    <div className="flex-1 bg-dark-bg/50 rounded-lg overflow-hidden flex items-center justify-center relative shadow-inner">
      {image && (
        <img
          src={`data:${image.mimeType};base64,${image.base64}`}
          alt="Editable canvas"
          className={`max-h-full max-w-full object-contain transition-opacity duration-300 ${isLoading ? 'opacity-30' : 'opacity-100'}`}
        />
      )}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
          <SpinnerIcon className="w-16 h-16 animate-spin text-brand-primary" />
          <p className="mt-4 text-lg font-medium text-dark-text-primary">Generating Magic...</p>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-900/80 p-4">
          <p className="text-center text-white">{error}</p>
        </div>
      )}
    </div>
  );
};
