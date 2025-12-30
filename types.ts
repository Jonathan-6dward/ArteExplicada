export interface Artwork {
  id: string; // Wikidata QID
  title: string;
  artist: string;
  year: string;
  image: string;
  movement?: string;
  description?: string;
}

export interface AnalysisResult {
  historicalContext: string;
  emotionalMeaning: string;
  curiosity: string;
  modernConnection: string;
  socialCaption: string;
  suggestedPalette: string[];
}

export interface PrintConfig {
  artwork: Artwork;
  mood: string;
  roomType: string;
  frameStyle: string;
}

export enum ViewMode {
  GALLERY = 'GALLERY',
  ANALYSIS = 'ANALYSIS',
  STUDIO = 'STUDIO',
  BLUEPRINT = 'BLUEPRINT' // The architectural proposal requested
}
