import React, { useEffect, useState } from 'react';
import { Artwork, AnalysisResult, Audience, Tone } from '../types';
import { analyzeArtwork } from '../services/geminiService';
import { Loader2, Share2, Heart, ArrowLeft, Brush, Copy, Instagram, MessageCircle, Hash, RefreshCcw } from 'lucide-react';

interface ArtDetailProps {
  artwork: Artwork;
  onBack: () => void;
  onCustomize: (art: Artwork) => void;
}

export const ArtDetail: React.FC<ArtDetailProps> = ({ artwork, onBack, onCustomize }) => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'INFO' | 'SOCIAL'>('INFO');
  
  // Social Controls
  const [audience, setAudience] = useState<Audience>(Audience.GENERAL);
  const [tone, setTone] = useState<Tone>(Tone.EDUCATIONAL);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadAnalysis();
  }, [artwork]);

  const loadAnalysis = async () => {
    setLoading(true);
    const result = await analyzeArtwork(artwork, audience, tone);
    setAnalysis(result);
    setLoading(false);
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Conteúdo copiado!");
  };

  const regenerateSocial = () => {
    loadAnalysis();
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] w-full bg-museum-900 overflow-hidden">
         <div className="absolute top-6 left-6 z-20">
            <button 
                onClick={onBack}
                className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-white/20 transition flex items-center gap-2 text-sm"
            >
                <ArrowLeft size={16} /> Voltar
            </button>
         </div>
        <img 
            src={artwork.image} 
            alt={artwork.title} 
            className="w-full h-full object-contain md:object-cover opacity-80 backdrop-blur-sm blur-sm scale-110"
        />
        <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
            <img src={artwork.image} className="max-h-full max-w-full shadow-2xl border-4 border-white/10 rounded-sm" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-museum-900 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-serif text-white mb-2">{artwork.title}</h1>
            <p className="text-lg text-stone-300 font-light">{artwork.artist}, {artwork.year}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 mb-8">
            <button 
                onClick={() => setActiveTab('INFO')}
                className={`pb-4 px-6 font-medium text-sm transition-colors relative ${activeTab === 'INFO' ? 'text-museum-900' : 'text-stone-500 hover:text-stone-700'}`}
            >
                Análise Curatorial
                {activeTab === 'INFO' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-museum-900"></div>}
            </button>
            <button 
                onClick={() => setActiveTab('SOCIAL')}
                className={`pb-4 px-6 font-medium text-sm transition-colors relative flex items-center gap-2 ${activeTab === 'SOCIAL' ? 'text-blue-600' : 'text-stone-500 hover:text-stone-700'}`}
            >
                <Share2 size={16} /> Social Studio
                {activeTab === 'SOCIAL' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>}
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-8">
                
                {loading || !analysis ? (
                    <div className="flex flex-col items-center justify-center py-20 text-museum-600 space-y-4">
                        <Loader2 className="animate-spin" size={40} />
                        <p>{activeTab === 'SOCIAL' ? 'Criando estratégia de conteúdo...' : 'Analisando obra...'}</p>
                    </div>
                ) : (
                    <>
                        {/* TAB: INFO */}
                        {activeTab === 'INFO' && (
                            <div className="space-y-8 animate-fadeIn">
                                <div className="prose prose-lg text-museum-800">
                                    <h3 className="font-serif text-2xl font-semibold mb-4 text-museum-900 flex items-center gap-2">
                                        <span className="bg-museum-100 p-1 rounded">🏛️</span> Contexto Histórico
                                    </h3>
                                    <p className="leading-relaxed border-l-4 border-museum-300 pl-4 italic bg-white p-6 rounded-r-lg shadow-sm">
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
                            </div>
                        )}

                        {/* TAB: SOCIAL */}
                        {activeTab === 'SOCIAL' && (
                            <div className="space-y-6 animate-fadeIn">
                                {/* Configuration Panel */}
                                <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl flex flex-col md:flex-row gap-6 justify-between items-center">
                                    <div className="w-full md:w-auto flex-1 grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-blue-800 uppercase mb-1">Público</label>
                                            <select 
                                                value={audience} 
                                                onChange={(e) => setAudience(e.target.value as Audience)}
                                                className="w-full text-sm rounded border-blue-200 p-2 text-blue-900"
                                            >
                                                {Object.values(Audience).map(a => <option key={a} value={a}>{a}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-blue-800 uppercase mb-1">Tom de Voz</label>
                                            <select 
                                                value={tone} 
                                                onChange={(e) => setTone(e.target.value as Tone)}
                                                className="w-full text-sm rounded border-blue-200 p-2 text-blue-900"
                                            >
                                                {Object.values(Tone).map(t => <option key={t} value={t}>{t}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={regenerateSocial}
                                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition"
                                    >
                                        <RefreshCcw size={16} /> Gerar Novo Conteúdo
                                    </button>
                                </div>

                                {/* Generated Content Blocks */}
                                <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                                    <div className="bg-stone-50 p-4 border-b border-stone-200 flex justify-between items-center">
                                        <div className="flex items-center gap-2 text-pink-600 font-bold">
                                            <Instagram size={18} /> Post para Feed
                                        </div>
                                        <button onClick={() => handleCopyToClipboard(analysis.social.caption)} className="text-stone-400 hover:text-stone-600"><Copy size={16} /></button>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div>
                                            <span className="text-xs font-bold text-stone-400 uppercase">Hook (Atenção)</span>
                                            <p className="font-serif text-xl text-stone-900 font-medium">{analysis.social.hook}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold text-stone-400 uppercase">Legenda (Corpo)</span>
                                            <p className="text-stone-600 whitespace-pre-wrap text-sm leading-relaxed mt-1">{analysis.social.caption}</p>
                                        </div>
                                        <div className="bg-stone-50 p-3 rounded text-xs text-blue-600 font-mono break-all">
                                            {analysis.social.hashtags}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2 text-purple-600 font-bold text-sm">
                                                <MessageCircle size={16} /> 1º Comentário
                                            </div>
                                            <button onClick={() => handleCopyToClipboard(analysis.social.firstComment)} className="text-stone-400 hover:text-stone-600"><Copy size={14} /></button>
                                        </div>
                                        <p className="text-stone-600 text-sm italic">"{analysis.social.firstComment}"</p>
                                    </div>

                                    <div className="bg-gradient-to-tr from-yellow-100 to-pink-100 rounded-xl shadow-sm border border-pink-100 p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2 text-pink-700 font-bold text-sm">
                                                <Heart size={16} /> Texto para Stories
                                            </div>
                                            <button onClick={() => handleCopyToClipboard(analysis.social.storyText)} className="text-pink-400 hover:text-pink-700"><Copy size={14} /></button>
                                        </div>
                                        <p className="text-pink-900 text-lg font-serif leading-tight">"{analysis.social.storyText}"</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Right Column: CTA & Palette */}
            <div className="lg:col-span-4 space-y-6">
                <div className="sticky top-24">
                    <div className="bg-white p-6 rounded-2xl shadow-xl border border-stone-100 text-center">
                        <h3 className="font-serif text-2xl mb-2">Gostou da Curadoria?</h3>
                        <p className="text-stone-500 mb-6 text-sm">Leve essa história para sua parede.</p>
                        
                        {analysis && (
                            <div className="mb-6">
                                <span className="text-xs font-bold text-stone-400 uppercase mb-2 block">Paleta da Obra</span>
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
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};