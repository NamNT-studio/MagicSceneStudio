
import React from 'react';
import type { Tool } from '../types';
import { ResetIcon } from './icons';

interface SidebarProps {
  tools: Tool[];
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
  onReset: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ tools, activeTool, setActiveTool, onReset }) => {
  return (
    <aside className="w-20 bg-dark-surface flex flex-col items-center py-4 border-r border-dark-border">
      <div className="flex flex-col gap-4">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool)}
            className={`p-3 rounded-lg transition-colors duration-200 ${
              activeTool.id === tool.id
                ? 'bg-brand-primary text-white'
                : 'text-dark-text-secondary hover:bg-dark-border'
            }`}
            title={tool.name}
          >
            <tool.Icon className="w-6 h-6" />
          </button>
        ))}
      </div>
      <div className="mt-auto">
        <button
          onClick={onReset}
          className="p-3 rounded-lg text-dark-text-secondary hover:bg-red-500/20 hover:text-red-400 transition-colors duration-200"
          title="Start Over"
        >
          <ResetIcon className="w-6 h-6" />
        </button>
      </div>
    </aside>
  );
};
