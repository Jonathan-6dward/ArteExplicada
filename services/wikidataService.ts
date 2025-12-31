import { Artwork, Era, Region } from '../types';

const SPARQL_ENDPOINT = "https://query.wikidata.org/sparql";

const getYearRange = (era: Era) => {
  switch (era) {
    case Era.RENAISSANCE: return { start: 1400, end: 1600 };
    case Era.BAROQUE: return { start: 1600, end: 1750 };
    case Era.MODERN: return { start: 1860, end: 1970 };
    case Era.CONTEMPORARY: return { start: 1970, end: 2024 };
    default: return null;
  }
};

const getRegionFilter = (region: Region) => {
  // Q46=Europe, Q12585=Latin America, Q48=Asia, Q49=North America
  switch (region) {
    case Region.EUROPE: return 'wd:Q46';
    case Region.LATAM: return 'wd:Q12585';
    case Region.ASIA: return 'wd:Q48';
    case Region.NORTH_AMERICA: return 'wd:Q49';
    default: return null;
  }
};

export const fetchCuratedArtworks = async (era: Era, region: Region): Promise<Artwork[]> => {
  const range = getYearRange(era);
  const regionQID = getRegionFilter(region);

  // Filter Logic Explanation:
  // P31 wd:Q3305213 = Instance of Painting
  // P18 = Has Image
  // P571 = Inception Date
  // P495 = Country of Origin (linked to Continent)
  // wikibase:sitelinks -> Sort by popularity
  
  let dateFilter = "";
  if (range) {
    dateFilter = `FILTER(YEAR(?date) >= ${range.start} && YEAR(?date) <= ${range.end})`;
  }

  let regionBlock = "";
  if (regionQID) {
    regionBlock = `?item wdt:P495 ?country . ?country wdt:P30 ${regionQID} .`;
  }

  const query = `
    SELECT DISTINCT ?item ?itemLabel ?image ?artistLabel ?date ?movementLabel ?sitelinks WHERE {
      ?item wdt:P31 wd:Q3305213;
            wdt:P18 ?image;
            wdt:P170 ?artist;
            wdt:P571 ?date.
      OPTIONAL { ?item wdt:P135 ?movement. }
      
      ${regionBlock}
      ${dateFilter}
      
      ?item wikibase:sitelinks ?sitelinks .
      
      SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],pt,en". }
    }
    ORDER BY DESC(?sitelinks)
    LIMIT 15
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
      movement: binding.movementLabel ? binding.movementLabel.value : 'Arte Clássica',
    }));
  } catch (error) {
    console.error("Wikidata Fetch Error", error);
    // Silent fail to fallback (handled in UI or simple empty return to trigger fallback list logic if needed)
    return [];
  }
};

// Keep the old function for "All/Default" view or fallback
export const fetchFamousArtworks = async (): Promise<Artwork[]> => {
    return fetchCuratedArtworks(Era.ALL, Region.ALL);
};