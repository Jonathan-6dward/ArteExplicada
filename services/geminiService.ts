import { GoogleGenAI, Type } from "@google/genai";
import { Artwork, AnalysisResult } from '../types';

// NOTE: In a production app, never expose keys in client code.
// This is for the requested functional demo structure.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeArtwork = async (artwork: Artwork): Promise<AnalysisResult> => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    Atue como um Curador de Arte Sênior e Estrategista Digital para o projeto "Arte Explicada".
    Analise a obra "${artwork.title}" de ${artwork.artist} (${artwork.year}, ${artwork.movement}).
    
    Gere um retorno JSON estrito com os seguintes campos:
    1. historicalContext: Um resumo breve e envolvente do contexto histórico (max 40 palavras).
    2. emotionalMeaning: A interpretação emocional e simbólica da obra. O que ela nos faz sentir? (max 40 palavras).
    3. curiosity: Um fato curioso e pouco conhecido sobre a obra.
    4. modernConnection: Como essa obra se conecta com os dilemas ou vida moderna hoje.
    5. socialCaption: Uma legenda perfeita para Instagram usando o método AIDA (Atenção, Interesse, Desejo, Ação), com emojis e um tom acessível.
    6. suggestedPalette: Uma lista de 4 códigos hexadecimais de cores que combinam com a obra para decoração.
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
            socialCaption: { type: Type.STRING },
            suggestedPalette: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
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
    // Fallback mock for demo purposes if API key is invalid/missing
    return {
      historicalContext: "Uma obra-prima criada durante um período de grande revolução cultural, refletindo as tensões da época.",
      emotionalMeaning: "A obra evoca uma profunda sensação de introspecção e a busca pela beleza no caos cotidiano.",
      curiosity: "Dizem que o artista escondeu suas iniciais nos olhos da figura principal.",
      modernConnection: "Nos lembra da importância de parar e observar o mundo em meio à nossa rotina acelerada de redes sociais.",
      socialCaption: "Você já parou para olhar os detalhes hoje? ✨ Esta obra nos ensina sobre a beleza do silêncio. Quer essa vibe na sua sala? Link na bio! 🖼️ #Arte #Design",
      suggestedPalette: ["#2C3E50", "#E74C3C", "#ECF0F1", "#3498DB"]
    };
  }
};

export const suggestMockupConfig = async (artwork: Artwork, mood: string, room: string) => {
    // This would ideally generate an image prompt or specific CSS config
    // For this demo, we simulate a delay and return success
    return new Promise(resolve => setTimeout(resolve, 1500));
};
