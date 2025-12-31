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
    Você é o Editor-Chefe e Curador Digital do "Arte Explicada".
    Sua missão: Transformar dados brutos de obras de arte em conteúdo viral e educativo.
    
    OBRA: "${artwork.title}" de ${artwork.artist} (${artwork.year}, ${artwork.movement}).
    PÚBLICO: ${audience}
    TOM DE VOZ: ${tone}
    
    ESTRUTURA OBRIGATÓRIA DA NARRATIVA (Use internamente para criar os textos):
    1. Hook (Gancho de atenção imediata)
    2. Contexto Histórico (Onde/Quando/Por que)
    3. Significado Simbólico (A camada invisível)
    4. Curiosidade (O detalhe que ninguém vê)
    5. Conexão Moderna (Por que importa hoje?)
    6. CTA (Chamada para ação: comentar ou ver quadro)

    Gere um JSON estrito com:
    
    1. historicalContext: (max 40 palavras)
    2. emotionalMeaning: (max 40 palavras)
    3. curiosity: (max 30 palavras)
    4. modernConnection: (max 30 palavras)
    5. suggestedPalette: [Hex1, Hex2, Hex3, Hex4]
    
    6. social: {
        instagram: {
            hook: "Frase curta e impactante para imagem",
            caption: "Legenda completa estruturada com o método AIDA, emojis e parágrafos curtos.",
            hashtags: "#hashtags #relevantes",
            firstComment: "Pergunta engajadora para fixar nos comentários.",
            storyText: "Texto curto (max 15 palavras) para overlay de Story."
        },
        twitter: {
            thread: [
                "Tweet 1: O Hook + Imagem",
                "Tweet 2: O Contexto",
                "Tweet 3: O Significado oculto",
                "Tweet 4: Conexão moderna + Link"
            ]
        },
        tiktok: {
            script: "Roteiro falado (narrativo) de 30 segundos, focado em retenção.",
            description: "Legenda curta + tags para o algoritmo."
        }
    }
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
                instagram: {
                    type: Type.OBJECT,
                    properties: {
                        hook: { type: Type.STRING },
                        caption: { type: Type.STRING },
                        hashtags: { type: Type.STRING },
                        firstComment: { type: Type.STRING },
                        storyText: { type: Type.STRING }
                    }
                },
                twitter: {
                    type: Type.OBJECT,
                    properties: {
                        thread: { type: Type.ARRAY, items: { type: Type.STRING } }
                    }
                },
                tiktok: {
                    type: Type.OBJECT,
                    properties: {
                        script: { type: Type.STRING },
                        description: { type: Type.STRING }
                    }
                }
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
    // Fallback mock
    return {
      historicalContext: "Erro na análise.",
      emotionalMeaning: "Arte é sentir.",
      curiosity: "Tente novamente.",
      modernConnection: "Sempre atual.",
      suggestedPalette: ["#333", "#666", "#999", "#CCC"],
      social: {
          instagram: {
              hook: "Arte incrível",
              caption: "Legenda indisponível.",
              hashtags: "#arte",
              firstComment: "O que achou?",
              storyText: "Veja isso."
          },
          twitter: { thread: ["Erro na geração."] },
          tiktok: { script: "Erro.", description: "Erro." }
      }
    };
  }
};