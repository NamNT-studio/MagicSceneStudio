
import React from 'react';
import type { ImageState } from '../types';

interface HistoryPanelProps {
  history: ImageState[];
  onJump: (index: number) => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onJump }) => {
  if (history.length <= 1) return null;

  return (
    <div className="h-28 bg-dark-surface rounded-lg p-2 shadow-lg">
      <p className="text-xs text-dark-text-secondary mb-2 px-2">History</p>
      <div className="flex gap-2 overflow-x-auto h-full pb-2">
        {history.map((state, index) => (
          <button
            key={index}
            onClick={() => onJump(index)}
            className="flex-shrink-0 w-20 h-20 bg-dark-border rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand-primary ring-offset-2 ring-offset-dark-surface"
          >
            <img
              src={`data:${state.mimeType};base64,${state.base64}`}
              alt={`History step ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
