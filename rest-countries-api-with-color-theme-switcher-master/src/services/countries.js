export async function fetchAllCountries() {
  const response = await fetch(
    'https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3'
  );
  if (!response.ok) {
    throw new Error('Failed to fetch countries');
  }
  return response.json();
}

export async function fetchCountryByName(name) {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,flags,population,region,capital,subregion,tld,currencies,languages,borders`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch country: ${name}`);
  }
  return response.json();
}

export async function fetchCountriesByCodes(codes) {
  const response = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${codes.join(',')}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch border countries");
  }
  return response.json();
}