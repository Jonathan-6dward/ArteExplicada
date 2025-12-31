export interface Artwork {
  id: string; // Wikidata QID
  title: string;
  artist: string;
  year: string;
  image: string;
  movement?: string;
  description?: string;
}

export interface InstagramContent {
  hook: string;
  caption: string;
  hashtags: string;
  firstComment: string;
  storyText: string;
}

export interface TwitterContent {
  thread: string[]; // Array of tweets
}

export interface TikTokContent {
  script: string; // Text to speak or put on screen
  description: string;
}

export interface SocialContent {
  instagram: InstagramContent;
  twitter: TwitterContent;
  tiktok: TikTokContent;
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
  ALL = 'Todas as Épocas',
  ANTIQUITY = 'Antiguidade (até 500 d.C.)',
  MEDIEVAL = 'Idade Média (500-1400)',
  RENAISSANCE = 'Renascimento (1400-1600)',
  BAROQUE = 'Barroco (1600-1750)',
  MODERN = 'Arte Moderna (1860-1970)',
  CONTEMPORARY = 'Contemporânea (1970-Hoje)'
}

export enum Region {
  ALL = 'Mundo Todo',
  EUROPE = 'Europa',
  LATAM = 'América Latina',
  NORTH_AMERICA = 'América do Norte',
  ASIA = 'Ásia',
  AFRICA = 'África',
  MIDDLE_EAST = 'Oriente Médio'
}

export enum Audience {
  GENERAL = 'Público Geral',
  GEN_Z = 'Geração Z / Jovem',
  EDUCATIONAL = 'Educacional / Professor',
  DECOR = 'Decorativo / Design',
  EMOTIONAL = 'Buscadores de Significado',
  COLLECTOR = 'Colecionador / Especialista'
}

export enum Tone {
  EDUCATIONAL = 'Didático',
  EMOTIONAL = 'Emocional/Poético',
  PROVOCATIVE = 'Provocativo/Polêmico',
  CURATORIAL = 'Curatorial/Técnico',
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