import { Artwork, Era, Region } from '../types';

const SPARQL_ENDPOINT = "https://query.wikidata.org/sparql";

const getYearRange = (era: Era) => {
  switch (era) {
    case Era.ANTIQUITY: return { start: -4000, end: 500 };
    case Era.MEDIEVAL: return { start: 500, end: 1400 };
    case Era.RENAISSANCE: return { start: 1400, end: 1600 };
    case Era.BAROQUE: return { start: 1600, end: 1750 };
    case Era.MODERN: return { start: 1860, end: 1970 };
    case Era.CONTEMPORARY: return { start: 1970, end: 2024 };
    default: return null;
  }
};

const getRegionFilter = (region: Region) => {
  switch (region) {
    case Region.EUROPE: return 'wd:Q46';
    case Region.LATAM: return 'wd:Q12585';
    case Region.ASIA: return 'wd:Q48';
    case Region.NORTH_AMERICA: return 'wd:Q49';
    case Region.AFRICA: return 'wd:Q15';
    case Region.MIDDLE_EAST: return 'wd:Q7204';
    default: return null;
  }
};

export const fetchCuratedArtworks = async (era: Era, region: Region): Promise<Artwork[]> => {
  const range = getYearRange(era);
  const regionQID = getRegionFilter(region);
  
  // Use a pseudo-random offset to allow discovering new works
  const offset = Math.floor(Math.random() * 5); 

  let dateFilter = "";
  if (range) {
    dateFilter = `FILTER(YEAR(?date) >= ${range.start} && YEAR(?date) <= ${range.end})`;
  }

  let regionBlock = "";
  if (regionQID) {
    // ?item wdt:P495 ?country . ?country wdt:P30 ?continent . FILTER(?continent = ${regionQID}) is simpler but P30 (continent) varies.
    // We use a direct path or subpath. For strictness we check P495 (country of origin) -> P30 (continent)
    regionBlock = `
      ?item wdt:P495 ?country . 
      ?country wdt:P30 ${regionQID} .
    `;
  }

  const query = `
    SELECT DISTINCT ?item ?itemLabel ?image ?artistLabel ?date ?movementLabel ?sitelinks WHERE {
      ?item wdt:P31 wd:Q3305213; # Instance of Painting
            wdt:P18 ?image;      # Has Image
            wdt:P170 ?artist;    # Has Artist
            wdt:P571 ?date.      # Has Date
            
      OPTIONAL { ?item wdt:P135 ?movement. }
      
      ${regionBlock}
      ${dateFilter}
      
      ?item wikibase:sitelinks ?sitelinks .
      
      SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],pt,en". }
    }
    ORDER BY DESC(?sitelinks)
    LIMIT 20
    OFFSET ${offset}
  `;

  const url = `${SPARQL_ENDPOINT}?query=${encodeURIComponent(query)}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data.results.bindings.map((binding: any) => ({
      id: binding.item.value.split('/').pop(),
      title: binding.itemLabel.value,
      artist: binding.artistLabel.value,
      year: binding.date ? new Date(binding.date.value).getFullYear().toString() : 'Unknown',
      image: binding.image.value,
      movement: binding.movementLabel ? binding.movementLabel.value : 'Movimento Histórico',
    }));
  } catch (error) {
    console.error("Wikidata Fetch Error", error);
    return [];
  }
};

export const fetchFamousArtworks = async (): Promise<Artwork[]> => {
    return fetchCuratedArtworks(Era.ALL, Region.ALL);
};