import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { Canvas } from './components/Canvas';
import { Sidebar } from './components/Sidebar';
import { HistoryPanel } from './components/HistoryPanel';
import { ControlPanel } from './components/ControlPanel';
import { useImageHistory } from './hooks/useImageHistory';
import { editImageWithGemini, fuseImagesWithGemini } from './services/geminiService';
import type { Tool, ImageState } from './types';
import { TOOLS } from './constants';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>(TOOLS[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { 
    history, 
    currentImage, 
    setInitialImage, 
    addImage, 
    undo, 
    canUndo, 
    jumpToState 
  } = useImageHistory();

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setInitialImage({
        base64: base64String.split(',')[1],
        mimeType: file.type
      });
      setActiveTool(TOOLS[0]);
    };
    reader.readAsDataURL(file);
  };

  const executeEdit = useCallback(async (prompt: string, secondaryImage?: ImageState) => {
    if (!currentImage) return;

    setIsLoading(true);
    setError(null);
    try {
      let newImageBase64: string;
      if (activeTool.id === 'image-fusion' && secondaryImage) {
        newImageBase64 = await fuseImagesWithGemini(currentImage, secondaryImage, prompt);
      } else {
        newImageBase64 = await editImageWithGemini(currentImage.base64, currentImage.mimeType, prompt);
      }
      addImage({ base64: newImageBase64, mimeType: currentImage.mimeType });
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [currentImage, addImage, activeTool.id]);

  const resetEditor = () => {
    setInitialImage(null);
    setError(null);
  };

  return (
    <div className="flex flex-col h-screen bg-dark-bg font-sans">
      <Header />
      <main className="flex flex-1 overflow-hidden">
        {currentImage ? (
          <>
            <Sidebar 
              tools={TOOLS}
              activeTool={activeTool}
              setActiveTool={setActiveTool}
              onReset={resetEditor}
            />
            <div className="flex-1 flex flex-col p-4 md:p-8 gap-4 overflow-hidden">
              <ControlPanel 
                activeTool={activeTool} 
                onGenerate={executeEdit}
                isLoading={isLoading}
                undo={undo}
                canUndo={canUndo}
                currentImage={currentImage}
              />
              <Canvas image={currentImage} isLoading={isLoading} error={error} />
              <HistoryPanel history={history} onJump={jumpToState} />
            </div>
          </>
        ) : (
          <FileUpload onImageUpload={handleImageUpload} />
        )}
      </main>
    </div>
  );
};

export default App;