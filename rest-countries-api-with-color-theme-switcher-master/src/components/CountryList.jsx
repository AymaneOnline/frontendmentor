import CountryCard from './CountryCard.jsx';

export default function CountryList({ countries }) {
  return (
    <ul className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10 lg:gap-12 justify-center'>
      {countries.map((country) => (
        <CountryCard country={country} key={country.cca3} />
      ))}
    </ul>
  );
}