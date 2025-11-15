import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCountryByName, fetchCountriesByCodes } from '../services/countries';
import { MoonLoader } from 'react-spinners';
import { FaArrowLeft } from "react-icons/fa";

export default function CountryDetail() {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCountryByName(name);
        const countryData = data[0];

        // 1️⃣ Exclude countries from main result if needed
        const excludedCountries = ["Israel"];
        if (excludedCountries.includes(countryData.name.common)) {
          setCountry(null);
          setBorderCountries([]);
          return;
        }

        setCountry(countryData);

        // 2️⃣ Fetch border countries if any
        if (countryData.borders && countryData.borders.length > 0) {
          const borderData = await fetchCountriesByCodes(countryData.borders);

          // 3️⃣ Filter border countries here 👇
          const filteredBorders = borderData.filter(
            (borderCountry) =>
              !excludedCountries.includes(borderCountry.name.common)
          );

          setBorderCountries(filteredBorders);
        } else {
          setBorderCountries([]);
        }
      } catch (error) {
        console.error("Error fetching country details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);


  if (loading) {
    return (
      <div className='w-full my-8 flex flex-col justify-center items-center'>
        <MoonLoader />
        <p>Loading country details...</p>
      </div>
    );
  }

  if (!country) {
    return (
      <div className='w-full my-8 flex flex-col justify-center items-center'>
        <p>Country not found.</p>
      </div>
    );
  }

  return (
    <>
      <Link
        to='/'
        className='flex items-center gap-2 w-fit bg-white mb-16 py-2 px-6 shadow-md rounded-sm cursor-pointer 
        dark:bg-[hsl(209,23%,22%)]'>
        <FaArrowLeft /> Back
      </Link>

      <div className='flex flex-col justify-center gap-16 sm:flex-row sm:items-start lg:gap-32 lg:justify-between lg:items-center'>
        <img
          className='md:w-1/2 mb-10 lg:mb-0 md:max-w-md h-auto object-cover shadow-md xl:max-w-xl 2xl:max-w-2xl'
          src={country.flags.png}
          alt={country.flags.alt}
        />

        <div className='w-1/2'>
          <h2 className='font-bold text-2xl mb-4'>{country.name.common}</h2>

          <div className='flex flex-col gap-8 lg:flex-row justify-between'>
            <ul className='font-bold flex flex-col gap-2 mb-10'>
              <li>Native Name: <span className='font-normal'>{country.name.nativeName[Object.keys(country.name.nativeName)[0]].common}</span></li>
              <li>Population: <span className='font-normal'>{country.population.toLocaleString()}</span></li>
              <li>Region: <span className='font-normal'>{country.region}</span></li>
              <li>Subregion: <span className='font-normal'>{country.subregion}</span></li>
              <li>Capital: <span className='font-normal'>{country.capital ? country.capital[0] : 'N/A'}</span></li>
            </ul>
            <ul className='font-bold flex flex-col gap-2 mb-10'>
              <li className='font-bold'>Top Level Domain: <span className='font-normal'>{country.tld ? country.tld.join(', ') : 'N/A'}</span></li>
              <li className='font-bold'>Currencies: <span className='font-normal'>{country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</span></li>
              <li className='font-bold'>Languages: <span className='font-normal'>{country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</span></li>
            </ul>
          </div>

          <div>
            <h3 className='font-bold mb-4'>Border Countries:</h3>
            <ul>
              {borderCountries.length > 0 ? (
                borderCountries.map((borderCountry) => (
                  <li
                    key={borderCountry.cca3}
                    className='inline-block mr-2 mb-2 px-4 py-2 bg-white shadow-md rounded-sm 
                    dark:bg-[hsl(209,23%,22%)]'>
                    <Link to={`/countries/${borderCountry.name.common}`}>
                      {borderCountry.name.common}
                    </Link>
                  </li>
                ))
              ) : (
                <li>No border countries</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}