import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Gallery } from './pages/Gallery';
import { ArtDetail } from './pages/ArtDetail';
import { PrintStudio } from './pages/PrintStudio';
import { ProjectArchitecture } from './pages/ProjectArchitecture';
import { ViewMode, Artwork } from './types';

export default function App() {
  const [view, setView] = useState<ViewMode>(ViewMode.GALLERY);
  const [selectedArt, setSelectedArt] = useState<Artwork | null>(null);

  const handleSelectArt = (art: Artwork) => {
    setSelectedArt(art);
    setView(ViewMode.ANALYSIS);
  };

  const handleCustomize = (art: Artwork) => {
    setSelectedArt(art);
    setView(ViewMode.STUDIO);
  };

  const renderView = () => {
    switch (view) {
      case ViewMode.GALLERY:
        return <Gallery onSelectArtwork={handleSelectArt} />;
      case ViewMode.ANALYSIS:
        if (!selectedArt) return <Gallery onSelectArtwork={handleSelectArt} />;
        return (
            <ArtDetail 
                artwork={selectedArt} 
                onBack={() => setView(ViewMode.GALLERY)}
                onCustomize={handleCustomize}
            />
        );
      case ViewMode.STUDIO:
        if (!selectedArt) return <Gallery onSelectArtwork={handleSelectArt} />;
        return (
            <PrintStudio 
                artwork={selectedArt} 
                onBack={() => setView(ViewMode.ANALYSIS)} 
            />
        );
      case ViewMode.BLUEPRINT:
        return <ProjectArchitecture />;
      default:
        return <Gallery onSelectArtwork={handleSelectArt} />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-museum-200">
      {view !== ViewMode.STUDIO && (
        <Navigation currentView={view} setView={setView} />
      )}
      <main>
        {renderView()}
      </main>
      
      {view !== ViewMode.STUDIO && (
        <footer className="bg-museum-900 text-museum-200 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
                <div>
                    <h3 className="font-serif text-xl text-white mb-4">Arte Explicada</h3>
                    <p className="text-sm opacity-80 max-w-xs">Democratizando a história da arte através da tecnologia e design emocional.</p>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Projeto</h4>
                    <ul className="space-y-2 text-sm opacity-80">
                        <li>Manifesto</li>
                        <li>Tecnologia (Gemini AI)</li>
                        <li>Dados (Wikidata)</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Contato</h4>
                    <p className="text-sm opacity-80">parcerias@arteexplicada.com</p>
                </div>
            </div>
        </footer>
      )}
    </div>
  );
}