import React, { useEffect, useState } from 'react';
import { Artwork, AnalysisResult } from '../types';
import { analyzeArtwork } from '../services/geminiService';
import { Loader2, Share2, Heart, ArrowLeft, Brush } from 'lucide-react';

interface ArtDetailProps {
  artwork: Artwork;
  onBack: () => void;
  onCustomize: (art: Artwork) => void;
}

export const ArtDetail: React.FC<ArtDetailProps> = ({ artwork, onBack, onCustomize }) => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
    
    const runAnalysis = async () => {
      const result = await analyzeArtwork(artwork);
      setAnalysis(result);
    };
    runAnalysis();
  }, [artwork]);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[80vh] w-full bg-museum-900 overflow-hidden">
         <div className="absolute top-6 left-6 z-20">
            <button 
                onClick={onBack}
                className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-white/20 transition flex items-center gap-2"
            >
                <ArrowLeft size={16} /> Voltar
            </button>
         </div>
        <img 
            src={artwork.image} 
            alt={artwork.title} 
            className="w-full h-full object-contain md:object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-museum-900 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-2">{artwork.title}</h1>
            <p className="text-xl text-stone-300 font-light">{artwork.artist}, {artwork.year}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Analysis */}
            <div className="lg:col-span-8 space-y-8">
                
                {/* Introduction (Hook) */}
                {!analysis ? (
                    <div className="space-y-4 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        <div className="flex items-center gap-2 text-museum-600 mt-4">
                            <Loader2 className="animate-spin" size={20} />
                            <span>A IA está analisando o contexto histórico e emocional...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="prose prose-lg text-museum-800">
                            <h3 className="font-serif text-2xl font-semibold mb-4 text-museum-900 flex items-center gap-2">
                                <span className="bg-museum-100 p-1 rounded">🏛️</span> Contexto Histórico
                            </h3>
                            <p className="leading-relaxed border-l-4 border-museum-300 pl-4 italic bg-white p-4 rounded-r-lg shadow-sm">
                                {analysis.historicalContext}
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
                             <h3 className="font-serif text-2xl font-semibold mb-4 text-museum-900 flex items-center gap-2">
                                <span className="bg-museum-100 p-1 rounded">❤️</span> Significado Emocional
                            </h3>
                            <p className="text-lg leading-relaxed text-stone-700">
                                {analysis.emotionalMeaning}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-museum-900 text-stone-100 p-6 rounded-xl">
                                <h4 className="font-bold text-sm uppercase tracking-wider text-museum-300 mb-2">Curiosidade</h4>
                                <p>{analysis.curiosity}</p>
                            </div>
                            <div className="bg-amber-50 text-amber-900 p-6 rounded-xl border border-amber-100">
                                <h4 className="font-bold text-sm uppercase tracking-wider text-amber-600 mb-2">Conexão Moderna</h4>
                                <p>{analysis.modernConnection}</p>
                            </div>
                        </div>

                        {/* Social Content Preview (Automation Demo) */}
                        <div className="border-t border-stone-200 pt-8 mt-8">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-sm font-bold text-stone-400 uppercase">Conteúdo Gerado Automaticamente (Instagram)</h4>
                                <button className="text-museum-600 text-sm flex items-center gap-1 hover:underline">
                                    <Share2 size={14} /> Copiar Legenda
                                </button>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 font-mono whitespace-pre-wrap">
                                {analysis.socialCaption}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Right Column: CTA & Palette */}
            <div className="lg:col-span-4 space-y-6">
                <div className="sticky top-24">
                    <div className="bg-white p-6 rounded-2xl shadow-xl border border-stone-100 text-center">
                        <h3 className="font-serif text-2xl mb-2">Leve para casa</h3>
                        <p className="text-stone-500 mb-6 text-sm">Transforme o significado desta obra em uma peça exclusiva para o seu ambiente.</p>
                        
                        {analysis && (
                            <div className="mb-6">
                                <span className="text-xs font-bold text-stone-400 uppercase mb-2 block">Paleta Sugerida</span>
                                <div className="flex justify-center gap-2">
                                    {analysis.suggestedPalette.map((color, idx) => (
                                        <div 
                                            key={idx} 
                                            className="w-10 h-10 rounded-full shadow-inner border border-stone-100" 
                                            style={{ backgroundColor: color }}
                                            title={color}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button 
                            onClick={() => onCustomize(artwork)}
                            className="w-full bg-museum-900 text-white py-4 rounded-lg font-medium text-lg hover:bg-museum-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            <Brush size={20} />
                            Personalizar Quadro
                        </button>
                        <p className="text-xs text-stone-400 mt-4">Frete grátis para todo o Brasil • Acabamento museológico</p>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};