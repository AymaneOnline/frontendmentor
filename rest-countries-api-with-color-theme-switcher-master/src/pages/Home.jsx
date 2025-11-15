import { useLoaderData, useSearchParams } from 'react-router-dom';
import { fetchAllCountries } from '../services/countries';
import SearchBar from '../components/SearchBar';
import FilderDropdown from '../components/FilterDropdown';
import CountryList from '../components/CountryList';

export async function countriesLoader() {
  try {
    const countries = await fetchAllCountries();
    return countries;
  } catch (error) {
    throw new Error('Failed to load countries', { status: 500 });
  }
}

export default function Home() {
  const countries = useLoaderData();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search')?.trim().toLowerCase() || '';
  const selectedRegion = searchParams.get('region') || '';

  // 1 Filter countries based on search term
  const searched = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm)
  )

  // 2 Further filter based on selected region
  const filteredCountries = selectedRegion
    ? searched.filter(c => c.region === selectedRegion)
    : searched;

  console.log('Filtered Countries:', filteredCountries);

  return (
    <>
      <div className='flex flex-col lg:flex-row lg:justify-between'>
        <SearchBar defaultValue={searchTerm} />
        <FilderDropdown />
      </div>
      <CountryList countries={filteredCountries} />
    </>
  );
}