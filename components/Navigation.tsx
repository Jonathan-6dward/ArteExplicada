import React from 'react';
import { ViewMode } from '../types';
import { Palette, BookOpen, ShoppingBag, LayoutGrid, FileText } from 'lucide-react';

interface NavigationProps {
  currentView: ViewMode;
  setView: (view: ViewMode) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView(ViewMode.GALLERY)}>
            <div className="w-8 h-8 bg-museum-900 text-white flex items-center justify-center rounded-sm font-serif font-bold text-xl">
              A
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-museum-900">Arte Explicada</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => setView(ViewMode.GALLERY)}
              className={`${currentView === ViewMode.GALLERY ? 'text-museum-900 border-b-2 border-museum-600' : 'text-stone-500 hover:text-museum-700'} px-1 pt-1 text-sm font-medium transition-colors flex items-center gap-2`}
            >
              <LayoutGrid size={16} /> Galeria
            </button>
            <button 
              onClick={() => setView(ViewMode.BLUEPRINT)}
              className={`${currentView === ViewMode.BLUEPRINT ? 'text-museum-900 border-b-2 border-museum-600' : 'text-stone-500 hover:text-museum-700'} px-1 pt-1 text-sm font-medium transition-colors flex items-center gap-2`}
            >
              <FileText size={16} /> Arquitetura do Projeto
            </button>
          </div>

          <div className="flex items-center">
             {/* Mock User Actions */}
             <button className="p-2 text-stone-400 hover:text-museum-800 transition">
                <ShoppingBag size={20} />
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};