import React from 'react';
import { ChevronLeft, MoreHorizontal, Disc } from 'lucide-react';

interface HeaderProps {
  onBack?: () => void;
  title?: string;
  theme?: 'light' | 'dark'; // Anticipating potential reuse
}

export const Header: React.FC<HeaderProps> = ({ onBack, title = "吉嘉名品汇店" }) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-gradient-to-b from-blue-50 to-blue-50/20 sticky top-0 z-50">
      <button 
        className="p-1 -ml-2 rounded-full hover:bg-black/5 transition-colors"
        onClick={onBack}
      >
        <ChevronLeft className="w-7 h-7 text-gray-800" strokeWidth={2} />
      </button>
      
      <h1 className="text-lg font-bold text-gray-900 tracking-wide">{title}</h1>
      
      <div className="flex items-center space-x-1 bg-white/60 rounded-full px-2 py-1 border border-gray-200">
        <button className="p-1">
          <MoreHorizontal className="w-5 h-5 text-gray-800" />
        </button>
        <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
        <button className="p-1">
          <Disc className="w-5 h-5 text-gray-800" />
        </button>
      </div>
    </header>
  );
};