import { FaSearch } from "react-icons/fa";
import { Form, useSubmit } from "react-router-dom";

export default function SearchBar({ defaultValue = '' }) {
  const submit = useSubmit();

  return (
    <Form
      id="search-form"
      role="search"
      className="px-10 py-4 mb-10 flex items-center gap-8 bg-white shadow-md rounded-md sm:max-w-md lg:min-w-lg
    dark:bg-[hsl(209,23%,22%)]">
      <FaSearch className="text-gray-400" size={20} />
      <input
        className="outline-none w-full bg-transparent dark:text-white placeholder:text-gray-400"
        aria-label="Search for a country"
        placeholder="Search for a country..."
        type="text"
        name="search"
        defaultValue={defaultValue}
        onChange={(event) => submit(event.target.form)}
      />
    </Form>
  );
}