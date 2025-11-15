import { Link } from 'react-router-dom';

export default function CountryCard({ country }) {
  return (
    <li
      className='auto-rows-fr bg-white dark:bg-[hsl(209,23%,22%)] flex flex-col shadow-md rounded-md cursor-pointer hover:scale-[1.02] transition-transform duration-200'>
      <Link to={`/countries/${country.name.common}`}>
        <img
          className='h-1/2 w-full object-cover rounded-t-md'
          src={country.flags.png}
          alt={country.flags.alt} />
        <div className='h-1/2 flex flex-col p-6 font-bold'>
          <h2 className='text-2xl mb-4'>{country.name.common}</h2>
          <ul className='text-lg'>
            <li>Population: <span className='font-normal'>{country.population.toLocaleString()}</span></li>
            <li>Region: <span className='font-normal'>{country.region}</span></li>
            <li>Capital: <span className='font-normal'>{country.capital ? country.capital[0] : 'N/A'}</span></li>
          </ul>
        </div>
      </Link>
    </li>
  );
}