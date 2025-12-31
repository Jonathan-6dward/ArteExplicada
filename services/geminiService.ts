import { GoogleGenAI, Type } from "@google/genai";
import { Artwork, AnalysisResult, Audience, Tone } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeArtwork = async (
  artwork: Artwork, 
  audience: Audience = Audience.GENERAL,
  tone: Tone = Tone.EDUCATIONAL
): Promise<AnalysisResult> => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    Atue como um Estrategista de Conteúdo Digital e Curador de Arte para o projeto "Arte Explicada".
    Analise a obra "${artwork.title}" de ${artwork.artist} (${artwork.year}, ${artwork.movement}).
    
    PÚBLICO ALVO: ${audience}
    TOM DE VOZ: ${tone}

    Gere um retorno JSON com:
    1. historicalContext: Resumo histórico (max 40 palavras).
    2. emotionalMeaning: Interpretação simbólica (max 40 palavras).
    3. curiosity: Fato curioso.
    4. modernConnection: Conexão com dias atuais.
    5. suggestedPalette: 4 cores hex.
    6. social: Um objeto contendo:
       - hook: Uma frase inicial de impacto (10-15 palavras) para prender a atenção.
       - caption: Legenda completa para Instagram usando método AIDA.
       - hashtags: 10 a 15 hashtags relevantes.
       - firstComment: Um comentário engajador para fixar.
       - storyText: Texto curto e direto para usar em um Story (max 20 palavras).
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            historicalContext: { type: Type.STRING },
            emotionalMeaning: { type: Type.STRING },
            curiosity: { type: Type.STRING },
            modernConnection: { type: Type.STRING },
            suggestedPalette: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            social: {
              type: Type.OBJECT,
              properties: {
                hook: { type: Type.STRING },
                caption: { type: Type.STRING },
                hashtags: { type: Type.STRING },
                firstComment: { type: Type.STRING },
                storyText: { type: Type.STRING },
              }
            }
          }
        }
      }
    });

    if (response.text) {
        return JSON.parse(response.text) as AnalysisResult;
    }
    throw new Error("No data returned");

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      historicalContext: "Erro ao analisar. Tente novamente.",
      emotionalMeaning: "Arte conecta através do tempo.",
      curiosity: "Sem dados.",
      modernConnection: "Sempre atual.",
      suggestedPalette: ["#000", "#FFF", "#333", "#666"],
      social: {
        hook: "Descubra esta obra incrível.",
        caption: "Arte é vida. #arte",
        hashtags: "#arte #historia",
        firstComment: "O que você sentiu?",
        storyText: "Arte do dia ✨"
      }
    };
  }
};