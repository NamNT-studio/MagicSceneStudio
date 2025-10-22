import React, { useState, useEffect } from 'react';
import type { Tool, ImageState } from '../types';
import { UndoIcon, DownloadIcon } from './icons';

interface ControlPanelProps {
  activeTool: Tool;
  onGenerate: (prompt: string, secondaryImage?: ImageState) => void;
  isLoading: boolean;
  undo: () => void;
  canUndo: boolean;
  currentImage: ImageState | null;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ activeTool, onGenerate, isLoading, undo, canUndo, currentImage }) => {
  const [inputValue, setInputValue] = useState('');
  const [secondaryImage, setSecondaryImage] = useState<ImageState | null>(null);

  useEffect(() => {
    setInputValue('');
    setSecondaryImage(null);
  }, [activeTool]);

  const handleSecondaryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSecondaryImage({
          base64: base64String.split(',')[1],
          mimeType: file.type
        });
      };
      reader.readAsDataURL(file);
      e.target.value = ''; // Allow re-uploading the same file
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (activeTool.id === 'image-fusion') {
      if (!secondaryImage) {
        alert("Please upload a second image for fusion.");
        return;
      }
       if (!inputValue) {
        alert("Please enter a prompt to describe how to fuse the images.");
        return;
      }
      onGenerate(inputValue, secondaryImage);
    } else if (activeTool.id === 'enhance-quality') {
        onGenerate(activeTool.promptPrefix);
    } else {
      if (!inputValue) return;
      const fullPrompt = `${activeTool.promptPrefix}${inputValue}`;
      onGenerate(fullPrompt);
    }
  };

  const handleOptionClick = (value: string) => {
    setInputValue(value);
    const fullPrompt = `${activeTool.promptPrefix}${value}`;
    onGenerate(fullPrompt);
  };

  const handleDownload = () => {
    if (!currentImage) return;
    const link = document.createElement('a');
    link.href = `data:${currentImage.mimeType};base64,${currentImage.base64}`;
    link.download = `magic-scene-studio.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="bg-dark-surface p-4 rounded-lg shadow-lg flex flex-col md:flex-row md:items-center gap-4">
      <div className="flex items-center gap-2 self-start md:self-center">
        <button onClick={undo} disabled={!canUndo || isLoading} className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-border transition-colors" title="Undo">
          <UndoIcon className="w-5 h-5"/>
        </button>
        <button onClick={handleDownload} disabled={!currentImage || isLoading} className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-border transition-colors" title="Download Image">
          <DownloadIcon className="w-5 h-5"/>
        </button>
      </div>

      <div className="flex-1 w-full">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 items-stretch md:items-center">
          {activeTool.id === 'enhance-quality' ? (
             <div className="flex-1 flex items-center justify-between w-full">
               <p className="text-sm text-dark-text-secondary">Improve resolution and details for a sharper, more professional look.</p>
               <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 font-semibold bg-brand-primary text-white rounded-md hover:bg-brand-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isLoading ? 'Enhancing...' : 'Enhance Image'}
                </button>
             </div>
          ) : activeTool.id === 'image-fusion' ? (
             <>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={activeTool.placeholder}
                className="w-full bg-dark-border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary md:flex-1"
                disabled={isLoading}
              />
              <div className='flex items-center gap-2 justify-between md:justify-start'>
                {secondaryImage && (
                  <img src={`data:${secondaryImage.mimeType};base64,${secondaryImage.base64}`} alt="secondary preview" className="w-10 h-10 object-cover rounded-md" />
                )}
                <label htmlFor="secondary-image-upload" className="cursor-pointer px-4 py-2 text-sm font-medium bg-dark-border rounded-md hover:bg-brand-primary transition-colors whitespace-nowrap">
                  {secondaryImage ? 'Change Image' : '+ Add Image'}
                </label>
                <input id="secondary-image-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleSecondaryImageChange}/>
              </div>
              <button
                type="submit"
                disabled={isLoading || !inputValue || !secondaryImage}
                className="px-6 py-2 font-semibold bg-brand-primary text-white rounded-md hover:bg-brand-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed md:whitespace-nowrap"
              >
                {isLoading ? 'Fusing...' : 'Fuse'}
              </button>
            </>
          ) : activeTool.options ? (
            <div className="flex-1 flex gap-2 flex-wrap">
              {activeTool.options.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleOptionClick(option.value)}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium bg-dark-border rounded-md hover:bg-brand-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {option.label}
                </button>
              ))}
            </div>
          ) : (
            <>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={activeTool.placeholder}
                className="w-full bg-dark-border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue}
                className="px-6 py-2 font-semibold bg-brand-primary text-white rounded-md hover:bg-brand-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed md:whitespace-nowrap"
              >
                {isLoading ? 'Generating...' : 'Generate'}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};