import React, { useState } from 'react';
import { Artwork } from '../types';
import { Check, Armchair, Home, Coffee, ArrowRight } from 'lucide-react';

interface PrintStudioProps {
  artwork: Artwork;
  onBack: () => void;
}

export const PrintStudio: React.FC<PrintStudioProps> = ({ artwork, onBack }) => {
  const [step, setStep] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedFrame, setSelectedFrame] = useState('black');
  const [loadingMockup, setLoadingMockup] = useState(false);

  const sizes = [
    { id: 'S', label: '30x40cm', price: 'R$ 189' },
    { id: 'M', label: '50x70cm', price: 'R$ 299' },
    { id: 'L', label: '70x100cm', price: 'R$ 459' },
  ];

  const frames = [
    { id: 'black', label: 'Preta Minimalista', color: '#1a1a1a' },
    { id: 'wood', label: 'Madeira Natural', color: '#8c6a5a' },
    { id: 'white', label: 'Branca Clean', color: '#f5f5f5' },
    { id: 'none', label: 'Sem Moldura', color: 'transparent' },
  ];

  const handleFinish = () => {
    setLoadingMockup(true);
    setTimeout(() => {
        setLoadingMockup(false);
        alert("Pedido simulado enviado para produção!");
        onBack();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
       <div className="bg-white border-b border-stone-200 py-4 px-6 flex items-center justify-between">
           <button onClick={onBack} className="text-sm font-medium text-stone-500 hover:text-museum-900">Cancelar</button>
           <span className="font-serif font-bold text-museum-900">Studio de Personalização</span>
           <span className="text-sm font-medium text-museum-600">Passo {step} de 2</span>
       </div>

       <div className="flex-1 flex flex-col lg:flex-row">
           {/* Preview Area */}
           <div className="flex-1 bg-stone-100 flex items-center justify-center p-8 relative overflow-hidden">
               {/* Simulated Wall */}
               <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
               
               <div className={`relative transition-all duration-500 bg-white shadow-2xl
                    ${selectedSize === 'S' ? 'w-[300px]' : selectedSize === 'M' ? 'w-[400px]' : 'w-[500px]'}
                    ${selectedFrame === 'black' ? 'border-[12px] border-neutral-900' : 
                      selectedFrame === 'wood' ? 'border-[12px] border-[#8c6a5a]' :
                      selectedFrame === 'white' ? 'border-[12px] border-gray-100' : ''}
               `}>
                   <img src={artwork.image} alt="Preview" className="w-full h-auto block" />
                   {selectedFrame !== 'none' && <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] pointer-events-none"></div>}
               </div>

               <div className="absolute bottom-8 flex gap-4 text-stone-400 text-sm">
                  <span className="flex items-center gap-1"><Armchair size={14}/> Sala de Estar</span>
                  <span className="flex items-center gap-1"><Home size={14}/> Escritório</span>
               </div>
           </div>

           {/* Controls Area */}
           <div className="w-full lg:w-[400px] bg-white border-l border-stone-200 p-8 flex flex-col shadow-xl z-10">
               
               <div className="mb-8">
                   <h2 className="font-serif text-2xl text-museum-900 mb-1">{artwork.title}</h2>
                   <p className="text-sm text-stone-500">{artwork.artist}</p>
               </div>

               {step === 1 && (
                   <div className="space-y-8 flex-1">
                       <div>
                           <label className="block text-sm font-bold text-stone-800 uppercase tracking-wide mb-4">Tamanho</label>
                           <div className="space-y-3">
                               {sizes.map(s => (
                                   <div 
                                        key={s.id}
                                        onClick={() => setSelectedSize(s.id)}
                                        className={`flex items-center justify-between p-4 rounded-lg cursor-pointer border transition-all ${selectedSize === s.id ? 'border-museum-900 bg-museum-50' : 'border-stone-200 hover:border-stone-300'}`}
                                   >
                                       <span className="font-medium">{s.label}</span>
                                       <span className="text-stone-600">{s.price}</span>
                                   </div>
                               ))}
                           </div>
                       </div>

                       <div>
                           <label className="block text-sm font-bold text-stone-800 uppercase tracking-wide mb-4">Moldura</label>
                           <div className="grid grid-cols-2 gap-3">
                               {frames.map(f => (
                                   <div 
                                        key={f.id}
                                        onClick={() => setSelectedFrame(f.id)}
                                        className={`p-3 rounded-lg cursor-pointer border flex flex-col items-center gap-2 transition-all text-center ${selectedFrame === f.id ? 'border-museum-900 bg-museum-50' : 'border-stone-200 hover:border-stone-300'}`}
                                   >
                                       <div className="w-8 h-8 rounded-full shadow-sm border border-stone-100" style={{ backgroundColor: f.color }}></div>
                                       <span className="text-xs font-medium">{f.label}</span>
                                   </div>
                               ))}
                           </div>
                       </div>
                   </div>
               )}

               <div className="mt-auto pt-8 border-t border-stone-100">
                   <div className="flex justify-between items-end mb-6">
                       <span className="text-stone-500">Total estimado</span>
                       <span className="text-2xl font-serif font-bold text-museum-900">
                           {sizes.find(s => s.id === selectedSize)?.price}
                       </span>
                   </div>
                   <button 
                        onClick={handleFinish}
                        disabled={loadingMockup}
                        className="w-full bg-museum-900 text-white py-4 rounded-lg font-medium hover:bg-museum-800 transition-colors flex justify-center items-center gap-2"
                    >
                       {loadingMockup ? 'Processando...' : <>Adicionar à Sacola <ArrowRight size={18}/></>}
                   </button>
               </div>
           </div>
       </div>
    </div>
  );
};