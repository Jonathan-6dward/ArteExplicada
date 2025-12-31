import React, { useEffect, useState } from 'react';
import { Artwork, AnalysisResult, Audience, Tone } from '../types';
import { analyzeArtwork } from '../services/geminiService';
import { Loader2, Share2, Heart, ArrowLeft, Brush, Copy, Instagram, Twitter, Video, RefreshCcw, LayoutDashboard, MonitorPlay } from 'lucide-react';

interface ArtDetailProps {
  artwork: Artwork;
  onBack: () => void;
  onCustomize: (art: Artwork) => void;
}

type PlatformTab = 'INSTAGRAM' | 'TWITTER' | 'TIKTOK';

export const ArtDetail: React.FC<ArtDetailProps> = ({ artwork, onBack, onCustomize }) => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Dashboard State
  const [platform, setPlatform] = useState<PlatformTab>('INSTAGRAM');
  const [audience, setAudience] = useState<Audience>(Audience.GENERAL);
  const [tone, setTone] = useState<Tone>(Tone.CURATORIAL);

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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could replace alert with a toast notification in a real app
    const btn = document.activeElement as HTMLElement;
    const originalText = btn.innerText;
    btn.innerText = "Copiado!";
    setTimeout(() => btn.innerText = originalText, 1500);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      
      {/* Top Bar Navigation */}
      <div className="bg-white border-b border-stone-200 px-6 py-4 sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
                onClick={onBack}
                className="p-2 hover:bg-stone-100 rounded-full text-stone-500 transition"
            >
                <ArrowLeft size={20} />
            </button>
            <div>
                <h1 className="text-lg font-serif font-bold text-museum-900 leading-none">{artwork.title}</h1>
                <span className="text-xs text-stone-500">{artwork.artist}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
              <button 
                onClick={() => onCustomize(artwork)}
                className="hidden md:flex bg-museum-900 text-white px-4 py-2 rounded-lg text-sm font-medium items-center gap-2 hover:bg-museum-800 transition shadow-sm"
              >
                  <Brush size={16} /> Criar Produto
              </button>
          </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Artwork & Core Data */}
        <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200">
                <div className="aspect-[3/4] rounded-lg overflow-hidden bg-stone-100 relative group">
                    <img 
                        src={artwork.image} 
                        alt={artwork.title} 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <a href={artwork.image} target="_blank" rel="noreferrer" className="text-white text-sm underline">Ver Alta Resolução</a>
                    </div>
                </div>
            </div>

            {/* Analysis Summary */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 space-y-4">
                <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider flex items-center gap-2">
                    <LayoutDashboard size={16} /> Análise Curatorial
                </h3>
                {loading ? (
                    <div className="space-y-2 animate-pulse">
                        <div className="h-4 bg-stone-100 rounded w-full"></div>
                        <div className="h-4 bg-stone-100 rounded w-5/6"></div>
                    </div>
                ) : analysis ? (
                    <div className="space-y-4 text-sm">
                        <div className="p-3 bg-museum-50 rounded-lg border border-museum-100">
                            <span className="font-bold text-museum-800 block mb-1">Significado</span>
                            <p className="text-museum-900">{analysis.emotionalMeaning}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="p-3 bg-stone-50 rounded-lg">
                                <span className="font-bold text-stone-500 block text-xs mb-1">Curiosidade</span>
                                <p className="text-stone-800 text-xs">{analysis.curiosity}</p>
                            </div>
                            <div className="p-3 bg-stone-50 rounded-lg">
                                <span className="font-bold text-stone-500 block text-xs mb-1">Contexto</span>
                                <p className="text-stone-800 text-xs">{analysis.historicalContext}</p>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>

        {/* Center/Right Column: Social Command Center */}
        <div className="lg:col-span-8 space-y-6">
            
            {/* Control Panel */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <h2 className="text-xl font-serif font-bold text-museum-900">Dashboard de Publicação</h2>
                        <p className="text-sm text-stone-500">Gere conteúdo multiplataforma adaptado ao seu público.</p>
                    </div>
                    <button 
                        onClick={loadAnalysis}
                        disabled={loading}
                        className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition disabled:opacity-50"
                    >
                        <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} /> 
                        {loading ? 'Gerando...' : 'Regenerar IA'}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-stone-400 uppercase mb-2">Público Alvo</label>
                        <select 
                            value={audience}
                            onChange={(e) => setAudience(e.target.value as Audience)}
                            className="w-full p-2.5 rounded-lg border border-stone-200 bg-stone-50 text-sm focus:ring-2 focus:ring-museum-200 outline-none"
                        >
                            {Object.values(Audience).map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-stone-400 uppercase mb-2">Tom de Voz</label>
                        <select 
                            value={tone}
                            onChange={(e) => setTone(e.target.value as Tone)}
                            className="w-full p-2.5 rounded-lg border border-stone-200 bg-stone-50 text-sm focus:ring-2 focus:ring-museum-200 outline-none"
                        >
                            {Object.values(Tone).map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* Platform Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden min-h-[500px] flex flex-col">
                <div className="flex border-b border-stone-200">
                    <button 
                        onClick={() => setPlatform('INSTAGRAM')}
                        className={`flex-1 py-4 flex items-center justify-center gap-2 text-sm font-medium transition-colors ${platform === 'INSTAGRAM' ? 'text-pink-600 bg-pink-50/50 border-b-2 border-pink-600' : 'text-stone-500 hover:bg-stone-50'}`}
                    >
                        <Instagram size={18} /> Instagram
                    </button>
                    <button 
                        onClick={() => setPlatform('TWITTER')}
                        className={`flex-1 py-4 flex items-center justify-center gap-2 text-sm font-medium transition-colors ${platform === 'TWITTER' ? 'text-sky-500 bg-sky-50/50 border-b-2 border-sky-500' : 'text-stone-500 hover:bg-stone-50'}`}
                    >
                        <Twitter size={18} /> X / Threads
                    </button>
                    <button 
                        onClick={() => setPlatform('TIKTOK')}
                        className={`flex-1 py-4 flex items-center justify-center gap-2 text-sm font-medium transition-colors ${platform === 'TIKTOK' ? 'text-black bg-stone-50/50 border-b-2 border-black' : 'text-stone-500 hover:bg-stone-50'}`}
                    >
                        <Video size={18} /> TikTok / Reels
                    </button>
                </div>

                <div className="p-6 flex-1 bg-stone-50/30">
                    {loading || !analysis ? (
                        <div className="h-full flex flex-col items-center justify-center text-stone-400 gap-3">
                            <Loader2 className="animate-spin" size={32} />
                            <p>Construindo estratégia...</p>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-fadeIn">
                            
                            {/* INSTAGRAM VIEW */}
                            {platform === 'INSTAGRAM' && (
                                <>
                                    <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-xs font-bold text-stone-400 uppercase">Legenda do Feed</span>
                                            <button onClick={() => handleCopy(analysis.social.instagram.caption)} className="text-stone-400 hover:text-pink-600 transition"><Copy size={16}/></button>
                                        </div>
                                        <div className="prose prose-sm max-w-none text-stone-700 whitespace-pre-wrap">
                                            {analysis.social.instagram.caption}
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-stone-100">
                                            <span className="text-xs font-bold text-stone-400 uppercase block mb-2">Hashtags</span>
                                            <div className="text-blue-600 text-sm font-mono bg-blue-50 p-3 rounded-lg flex justify-between items-center group">
                                                {analysis.social.instagram.hashtags}
                                                <button onClick={() => handleCopy(analysis.social.instagram.hashtags)} className="opacity-0 group-hover:opacity-100 text-blue-400 hover:text-blue-700"><Copy size={14}/></button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-gradient-to-tr from-yellow-50 to-pink-50 p-6 rounded-xl border border-pink-100">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs font-bold text-pink-400 uppercase">Story Overlay</span>
                                                <button onClick={() => handleCopy(analysis.social.instagram.storyText)} className="text-pink-400 hover:text-pink-700"><Copy size={14}/></button>
                                            </div>
                                            <p className="font-serif text-xl text-pink-900 leading-tight">"{analysis.social.instagram.storyText}"</p>
                                        </div>
                                        <div className="bg-white p-6 rounded-xl border border-stone-200">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs font-bold text-stone-400 uppercase">1º Comentário</span>
                                                <button onClick={() => handleCopy(analysis.social.instagram.firstComment)} className="text-stone-400 hover:text-stone-700"><Copy size={14}/></button>
                                            </div>
                                            <p className="text-stone-600 text-sm italic">"{analysis.social.instagram.firstComment}"</p>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* TWITTER VIEW */}
                            {platform === 'TWITTER' && (
                                <div className="space-y-4 max-w-xl mx-auto">
                                    {analysis.social.twitter.thread.map((tweet, idx) => (
                                        <div key={idx} className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm relative group">
                                            <div className="flex gap-3">
                                                <div className="w-10 h-10 bg-museum-900 rounded-full flex-shrink-0"></div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-bold text-sm">Arte Explicada</span>
                                                        <span className="text-stone-400 text-xs">@arteexplicada</span>
                                                    </div>
                                                    <p className="text-stone-800 text-sm whitespace-pre-wrap">{tweet}</p>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => handleCopy(tweet)}
                                                className="absolute top-2 right-2 p-2 text-stone-300 hover:text-sky-500 opacity-0 group-hover:opacity-100 transition"
                                            >
                                                <Copy size={14} />
                                            </button>
                                            {idx < analysis.social.twitter.thread.length - 1 && (
                                                <div className="absolute left-9 bottom-[-20px] w-0.5 h-6 bg-stone-200"></div>
                                            )}
                                        </div>
                                    ))}
                                    <button 
                                        onClick={() => handleCopy(analysis.social.twitter.thread.join('\n\n'))}
                                        className="w-full py-2 text-sky-600 text-sm font-medium hover:bg-sky-50 rounded-lg transition border border-dashed border-sky-200"
                                    >
                                        Copiar Thread Completa
                                    </button>
                                </div>
                            )}

                            {/* TIKTOK VIEW */}
                            {platform === 'TIKTOK' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                                    <div className="bg-black text-white p-6 rounded-2xl shadow-xl border-4 border-stone-800 relative overflow-hidden flex flex-col justify-end min-h-[400px]">
                                        {/* Mock Phone UI */}
                                        <div className="absolute inset-0 opacity-40">
                                            <img src={artwork.image} className="w-full h-full object-cover blur-sm" />
                                        </div>
                                        <div className="relative z-10 space-y-4">
                                            <div className="bg-black/50 backdrop-blur-md p-4 rounded-xl border border-white/10">
                                                <span className="text-[10px] text-stone-400 uppercase font-bold mb-1 block">Roteiro (Teleprompter)</span>
                                                <p className="text-sm leading-relaxed text-stone-100 font-medium">
                                                    {analysis.social.tiktok.script}
                                                </p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => handleCopy(analysis.social.tiktok.script)}
                                            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-md transition"
                                        >
                                            <Copy size={16} />
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="bg-white p-6 rounded-xl border border-stone-200">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs font-bold text-stone-400 uppercase flex items-center gap-1"><MonitorPlay size={14}/> Descrição do Vídeo</span>
                                                <button onClick={() => handleCopy(analysis.social.tiktok.description)} className="text-stone-400 hover:text-stone-700"><Copy size={14}/></button>
                                            </div>
                                            <p className="text-stone-700 text-sm">{analysis.social.tiktok.description}</p>
                                        </div>

                                        <div className="bg-stone-100 p-6 rounded-xl text-center">
                                            <h4 className="font-serif text-lg text-stone-600 mb-2">Dica de Produção</h4>
                                            <p className="text-xs text-stone-500">
                                                Use a imagem da obra no fundo (Green Screen) e aponte para o detalhe mencionado na seção "Curiosidade" aos 0:15s do vídeo.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};