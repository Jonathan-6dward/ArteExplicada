import React from 'react';
import { Database, Cpu, Layers, Palette, Workflow, Globe } from 'lucide-react';

export const ProjectArchitecture: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-12 border-b border-stone-200 pb-8">
        <h1 className="text-4xl font-serif font-bold text-museum-900 mb-4">Arquitetura do Projeto: "Arte Explicada"</h1>
        <p className="text-xl text-museum-700">Proposta Técnica e Estratégica para Plataforma de Curadoria Digital</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-museum-100 p-2 rounded-lg text-museum-900"><Database size={24} /></div>
            <h2 className="text-2xl font-serif font-bold">1. Arquitetura de Dados</h2>
          </div>
          <div className="prose prose-stone">
             <p className="text-stone-600 mb-4">
                O sistema utiliza uma abordagem "Lakehouse" simplificada para lidar com dados estruturados e não estruturados.
             </p>
             <ul className="space-y-2 list-disc pl-5 text-stone-700">
                <li><strong>Ingestão (ETL):</strong> Pipelines Python (Airflow) consultam Wikidata (SPARQL) diariamente para novas obras baseadas em popularidade.</li>
                <li><strong>Enriquecimento:</strong> Scripts acessam a API do Google Arts & Culture e Wikipedia para extrair metadados textuais e visuais.</li>
                <li><strong>Armazenamento:</strong>
                    <ul className="pl-5 mt-1 text-sm text-stone-500">
                        <li><em>PostgreSQL:</em> Metadados relacionais (Obras, Artistas, Vendas).</li>
                        <li><em>Vector DB (Pinecone):</em> Embeddings das descrições para busca semântica ("quadro que transmite paz").</li>
                    </ul>
                </li>
             </ul>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-museum-100 p-2 rounded-lg text-museum-900"><Cpu size={24} /></div>
            <h2 className="text-2xl font-serif font-bold">2. Camada de IA (Gemini)</h2>
          </div>
          <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
             <h3 className="font-bold text-museum-800 mb-3">Pipeline de Processamento</h3>
             <ol className="space-y-4 relative border-l border-museum-200 ml-2 pl-6">
                <li className="relative">
                    <span className="absolute -left-[31px] bg-white border border-museum-200 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <strong className="block text-museum-900">Análise Visual</strong>
                    <span className="text-sm text-stone-600">Gemini Vision identifica paleta de cores, composição e elementos chave.</span>
                </li>
                <li className="relative">
                    <span className="absolute -left-[31px] bg-white border border-museum-200 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <strong className="block text-museum-900">Síntese Narrativa</strong>
                    <span className="text-sm text-stone-600">Cruza fatos históricos com psicologia das cores para gerar o texto "Significado Emocional".</span>
                </li>
                <li className="relative">
                    <span className="absolute -left-[31px] bg-white border border-museum-200 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <strong className="block text-museum-900">Geração de Produto</strong>
                    <span className="text-sm text-stone-600">Sugere automaticamente molduras e ambientes (mockups) baseados no estilo da obra.</span>
                </li>
             </ol>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-museum-100 p-2 rounded-lg text-museum-900"><Layers size={24} /></div>
            <h2 className="text-2xl font-serif font-bold">3. Estratégia de Conteúdo</h2>
          </div>
          <div className="prose prose-stone">
             <p className="text-stone-600">
                O "Growth Loop" é alimentado pela transformação de dados brutos em conteúdo compartilhável.
             </p>
             <div className="grid grid-cols-2 gap-4 mt-4">
                 <div className="border p-4 rounded bg-white">
                     <span className="text-xs font-bold uppercase text-museum-500">Instagram Reels</span>
                     <p className="text-sm mt-1">Zoom dinâmico na obra com narração TTS (Text-to-Speech) gerada pelo script da IA.</p>
                 </div>
                 <div className="border p-4 rounded bg-white">
                     <span className="text-xs font-bold uppercase text-museum-500">Carrossel Educativo</span>
                     <p className="text-sm mt-1">5 slides: Obra Inteira -> Detalhe Oculto -> Contexto -> Significado -> Produto.</p>
                 </div>
             </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-museum-100 p-2 rounded-lg text-museum-900"><Globe size={24} /></div>
            <h2 className="text-2xl font-serif font-bold">4. Escalabilidade</h2>
          </div>
           <ul className="space-y-3 text-stone-700">
               <li className="flex items-start gap-2">
                   <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-museum-500"></div>
                   <span><strong>Internacionalização (i18n):</strong> A arquitetura permite tradução instantânea dos JSONs de análise para EN, ES, FR.</span>
               </li>
               <li className="flex items-start gap-2">
                   <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-museum-500"></div>
                   <span><strong>Marketplace:</strong> Abertura para artistas contemporâneos submeterem obras para a mesma análise de IA.</span>
               </li>
               <li className="flex items-start gap-2">
                   <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-museum-500"></div>
                   <span><strong>API B2B:</strong> Licenciar a "Curadoria via IA" para museus e galerias físicas (QR Codes).</span>
               </li>
           </ul>
        </section>
      </div>
    </div>
  );
};