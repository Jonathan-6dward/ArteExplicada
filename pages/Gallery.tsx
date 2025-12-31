import React, { useEffect, useState } from 'react';
import { Artwork, Era, Region } from '../types';
import { fetchCuratedArtworks } from '../services/wikidataService';
import { Search, Loader2, SlidersHorizontal, Map, CalendarClock, Globe } from 'lucide-react';

interface GalleryProps {
  onSelectArtwork: (art: Artwork) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onSelectArtwork }) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [selectedEra, setSelectedEra] = useState<Era>(Era.ALL);
  const [selectedRegion, setSelectedRegion] = useState<Region>(Region.ALL);

  useEffect(() => {
    loadArtworks();
  }, [selectedEra, selectedRegion]);

  const loadArtworks = async () => {
    setLoading(true);
    const data = await fetchCuratedArtworks(selectedEra, selectedRegion);
    
    // Fallback if empty (sometimes Wikidata is strict or rate limited)
    if (data.length === 0) {
        // Fallback demo data
        const fallback: Artwork[] = [
             { id: "Q12418", title: "Mona Lisa", artist: "Leonardo da Vinci", year: "1503", image: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg", movement: "Renascimento" },
             { id: "Q29813", title: "A Noite Estrelada", artist: "Vincent van Gogh", year: "1889", image: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg", movement: "Pós-Impressionismo" },
             { id: "Q190099", title: "O Nascimento de Vênus", artist: "Sandro Botticelli", year: "1486", image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg", movement: "Renascimento" }
        ];
        setArtworks(fallback);
    } else {
        setArtworks(data);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
      
      {/* Sidebar de Curadoria - V3 Design */}
      <aside className="w-full lg:w-72 flex-shrink-0 space-y-8 bg-white p-6 rounded-xl border border-stone-200 h-fit sticky top-24 shadow-sm">
        <div>
            <h2 className="text-xl font-serif font-bold text-museum-900 mb-2 flex items-center gap-2">
                <SlidersHorizontal size={20} /> Curadoria
            </h2>
            <p className="text-xs text-stone-500 mb-6 leading-relaxed">
                Use os filtros para encontrar obras com potencial viral e relevância histórica.
            </p>
            
            <div className="space-y-6">
                <div>
                    <label className="block text-xs font-bold text-museum-500 uppercase mb-3 flex items-center gap-2">
                        <CalendarClock size={14} /> Período Histórico
                    </label>
                    <div className="space-y-1">
                        {Object.values(Era).map((era) => (
                            <button
                                key={era}
                                onClick={() => setSelectedEra(era)}
                                className={`w-full text-left px-3 py-2 rounded-md text-xs transition-all ${selectedEra === era ? 'bg-museum-900 text-white font-medium' : 'hover:bg-stone-100 text-stone-600'}`}
                            >
                                {era}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="border-t border-stone-100 pt-6">
                    <label className="block text-xs font-bold text-museum-500 uppercase mb-3 flex items-center gap-2">
                        <Globe size={14} /> Região / Origem
                    </label>
                    <div className="space-y-1">
                        {Object.values(Region).map((region) => (
                            <button
                                key={region}
                                onClick={() => setSelectedRegion(region)}
                                className={`w-full text-left px-3 py-2 rounded-md text-xs transition-all ${selectedRegion === region ? 'bg-museum-900 text-white font-medium' : 'hover:bg-stone-100 text-stone-600'}`}
                            >
                                {region}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </aside>

      {/* Grid Principal */}
      <div className="flex-1">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-serif font-medium text-museum-900">
                {selectedEra === Era.ALL ? 'Acervo Global' : selectedEra}
                </h1>
                <p className="text-stone-500 text-sm mt-1 flex items-center gap-2">
                    <Map size={14}/> {selectedRegion === Region.ALL ? 'Todas as regiões' : selectedRegion}
                    <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
                    {artworks.length} obras selecionadas
                </p>
            </div>
            
            <div className="relative w-full sm:w-72">
                 <input 
                    type="text" 
                    placeholder="Filtrar por nome ou artista..." 
                    className="w-full pl-10 pr-4 py-2.5 rounded-full border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-museum-400 text-sm shadow-sm"
                />
                <Search className="absolute left-3.5 top-3 text-stone-400" size={16} />
            </div>
        </div>

        {loading ? (
            <div className="h-96 flex flex-col items-center justify-center text-museum-600">
                <Loader2 className="animate-spin mb-4" size={32} />
                <p className="font-serif text-sm">Consultando Wikidata...</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {artworks.map((art) => (
                <div 
                    key={art.id} 
                    className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 border border-stone-100 overflow-hidden flex flex-col"
                    onClick={() => onSelectArtwork(art)}
                >
                    <div className="aspect-[4/5] overflow-hidden bg-stone-100 relative">
                    <img 
                        src={art.image} 
                        alt={art.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <span className="text-white font-serif text-lg font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Criar Conteúdo</span>
                        <p className="text-white/80 text-xs mt-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">Gerar posts para Instagram, X e TikTok</p>
                    </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                    <span className="text-[10px] font-bold tracking-widest text-museum-500 uppercase mb-1">{art.movement}</span>
                    <h3 className="text-base font-serif font-bold text-museum-900 leading-tight mb-1">{art.title}</h3>
                    <p className="text-stone-500 text-xs">{art.artist}, {art.year}</p>
                    </div>
                </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};