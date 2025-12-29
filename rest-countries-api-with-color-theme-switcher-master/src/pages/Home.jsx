import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchAllCountries } from '../services/countries';
import SearchBar from '../components/SearchBar';
import FilderDropdown from '../components/FilterDropdown';
import CountryList from '../components/CountryList';

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchParams] = useSearchParams();
  const searchTerm =
    searchParams.get('search')?.trim().toLowerCase() || '';
  const selectedRegion = searchParams.get('region') || '';

  useEffect(() => {
    let isMounted = true;

    async function loadCountries() {
      try {
        const data = await fetchAllCountries();
        if (isMounted) {
          setCountries(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load countries');
          setLoading(false);
        }
      }
    }

    loadCountries();

    return () => {
      isMounted = false;
    };
  }, []);

  // 1️⃣ Filter by search
  const searched = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm)
  );

  // 2️⃣ Filter by region
  const filteredCountries = selectedRegion
    ? searched.filter(c => c.region === selectedRegion)
    : searched;

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <SearchBar defaultValue={searchTerm} />
        <FilderDropdown />
      </div>

      {loading && <p>Loading countries...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <CountryList countries={filteredCountries} />
      )}
    </>
  );
}
