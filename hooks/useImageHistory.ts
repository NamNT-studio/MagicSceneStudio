
import { useState, useCallback } from 'react';
import type { ImageState } from '../types';

export const useImageHistory = () => {
  const [history, setHistory] = useState<ImageState[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const setInitialImage = useCallback((image: ImageState | null) => {
    if (image) {
      setHistory([image]);
      setCurrentIndex(0);
    } else {
      setHistory([]);
      setCurrentIndex(-1);
    }
  }, []);

  const addImage = useCallback((image: ImageState) => {
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(image);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  }, [history, currentIndex]);

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, history.length]);

  const jumpToState = useCallback((index: number) => {
    if (index >= 0 && index < history.length) {
      setCurrentIndex(index);
    }
  }, [history.length]);
  
  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;
  const currentImage = history[currentIndex] || null;

  return { 
    history, 
    currentIndex,
    currentImage, 
    setInitialImage, 
    addImage, 
    undo, 
    redo, 
    canUndo, 
    canRedo,
    jumpToState
  };
};
