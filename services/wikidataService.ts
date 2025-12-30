import { Artwork } from '../types';

const SPARQL_ENDPOINT = "https://query.wikidata.org/sparql";

// A query to get famous paintings (instances of painting P31=Q3305213) 
// that have an image and a sitelink to Portuguese or English wikipedia to ensure notability.
const FETCH_FAMOUS_ART_QUERY = `
SELECT DISTINCT ?item ?itemLabel ?image ?artistLabel ?date ?movementLabel WHERE {
  ?item wdt:P31 wd:Q3305213;
        wdt:P18 ?image;
        wdt:P170 ?artist;
        wdt:P571 ?date.
  OPTIONAL { ?item wdt:P135 ?movement. }
  
  # Ensure it's somewhat famous by having sitelinks
  ?article schema:about ?item ;
           schema:isPartOf <https://en.wikipedia.org/> .
  
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],pt,en". }
}
LIMIT 12
`;

export const fetchFamousArtworks = async (): Promise<Artwork[]> => {
  const url = `${SPARQL_ENDPOINT}?query=${encodeURIComponent(FETCH_FAMOUS_ART_QUERY)}&format=json`;
  
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
    console.error("Error fetching from Wikidata", error);
    // Fallback data in case of API failure (or CORS issues in some strict environments)
    return [
      {
        id: "Q12418",
        title: "Mona Lisa",
        artist: "Leonardo da Vinci",
        year: "1503",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
        movement: "Renascimento"
      },
      {
        id: "Q29813",
        title: "A Noite Estrelada",
        artist: "Vincent van Gogh",
        year: "1889",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
        movement: "Pós-Impressionismo"
      },
      {
        id: "Q499697",
        title: "Moça com o Brinco de Pérola",
        artist: "Johannes Vermeer",
        year: "1665",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/0f/1665_Girl_with_a_Pearl_Earring.jpg",
        movement: "Barroco"
      }
    ];
  }
};
