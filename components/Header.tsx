
import React from 'react';
import { MagicWandIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center p-4 bg-dark-surface border-b border-dark-border shadow-md z-10">
      <MagicWandIcon className="w-8 h-8 text-brand-primary" />
      <h1 className="ml-3 text-2xl font-bold tracking-tight text-dark-text-primary">
        MagicScene Studio
      </h1>
    </header>
  );
};
