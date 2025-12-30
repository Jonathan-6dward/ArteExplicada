import React, { useEffect, useState } from 'react';
import { Artwork } from '../types';
import { fetchFamousArtworks } from '../services/wikidataService';
import { Search, Loader2 } from 'lucide-react';

interface GalleryProps {
  onSelectArtwork: (art: Artwork) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onSelectArtwork }) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchFamousArtworks();
      setArtworks(data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-museum-600">
        <Loader2 className="animate-spin mb-4" size={40} />
        <p className="font-serif text-lg">Curando coleção...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-medium text-museum-900 mb-4">
          Descubra o Significado
        </h1>
        <p className="text-lg text-museum-600 max-w-2xl mx-auto">
          Explore as histórias ocultas por trás das maiores obras-primas da humanidade e leve essa emoção para sua casa.
        </p>
      </div>

      <div className="relative max-w-lg mx-auto mb-12">
        <input 
          type="text" 
          placeholder="Busque por artista, movimento ou emoção..." 
          className="w-full pl-10 pr-4 py-3 rounded-full border border-museum-200 bg-white focus:outline-none focus:ring-2 focus:ring-museum-400 shadow-sm"
        />
        <Search className="absolute left-3 top-3.5 text-museum-400" size={20} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {artworks.map((art) => (
          <div 
            key={art.id} 
            className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 overflow-hidden"
            onClick={() => onSelectArtwork(art)}
          >
            <div className="aspect-[4/5] overflow-hidden bg-stone-100 relative">
              <img 
                src={art.image} 
                alt={art.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[10%] group-hover:grayscale-0"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-medium">Analisar Obra &rarr;</span>
              </div>
            </div>
            <div className="p-6">
              <span className="text-xs font-bold tracking-wider text-museum-500 uppercase">{art.movement}</span>
              <h3 className="text-xl font-serif font-semibold text-museum-900 mt-2 truncate">{art.title}</h3>
              <p className="text-stone-500 mt-1">{art.artist}, {art.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};