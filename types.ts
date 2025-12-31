export interface Artwork {
  id: string; // Wikidata QID
  title: string;
  artist: string;
  year: string;
  image: string;
  movement?: string;
  description?: string;
}

export interface SocialContent {
  hook: string;
  caption: string;
  hashtags: string;
  firstComment: string;
  storyText: string;
}

export interface AnalysisResult {
  historicalContext: string;
  emotionalMeaning: string;
  curiosity: string;
  modernConnection: string;
  suggestedPalette: string[];
  social: SocialContent;
}

export enum Era {
  ALL = 'Todas',
  RENAISSANCE = 'Renascimento (1400-1600)',
  BAROQUE = 'Barroco (1600-1750)',
  MODERN = 'Arte Moderna (1860-1970)',
  CONTEMPORARY = 'Contemporânea (1970-Hoje)'
}

export enum Region {
  ALL = 'Mundo Todo',
  EUROPE = 'Europa',
  LATAM = 'América Latina',
  ASIA = 'Ásia',
  NORTH_AMERICA = 'América do Norte'
}

export enum Audience {
  GENERAL = 'Público Geral',
  GEN_Z = 'Geração Z / Jovem',
  EDUCATIONAL = 'Educacional / Professor',
  DECOR = 'Decorativo / Design',
  EMOTIONAL = 'Buscadores de Significado'
}

export enum Tone {
  EDUCATIONAL = 'Didático',
  EMOTIONAL = 'Emocional/Poético',
  CURIOSITY = 'Curioso/Fatos',
  MINIMALIST = 'Minimalista'
}

export interface ViewModeState {
  mode: 'GALLERY' | 'ANALYSIS' | 'STUDIO' | 'BLUEPRINT';
  subTab?: 'INFO' | 'SOCIAL';
}

export enum ViewMode {
  GALLERY = 'GALLERY',
  ANALYSIS = 'ANALYSIS',
  STUDIO = 'STUDIO',
  BLUEPRINT = 'BLUEPRINT'
}