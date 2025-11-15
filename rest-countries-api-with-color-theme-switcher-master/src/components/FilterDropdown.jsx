import { Form, useSubmit } from "react-router-dom";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function FilterDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("All");
  const submit = useSubmit();

  const options = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  return (
    <Form
      id="filter-form"
      role="filter"
    >

      <div className="w-[250px] relative px-6 py-4 mb-10 bg-white shadow-md rounded-md sm:max-w-xs dark:bg-[hsl(209,23%,22%)]">
        <button
          className="w-full flex justify-between items-center cursor-pointer outline-none dark:text-white"
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          <span>Filter by Region</span>
          <FaChevronDown />
        </button>

        {isOpen && (
          <ul className="absolute top-14 left-0 right-0 z-10 mt-2 py-4 rounded-md bg-white shadow-lg dark:bg-[hsl(209,23%,22%)]">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => {
                  setSelected(option);
                  setIsOpen(false);
                  const formData = new FormData();
                  formData.set("region", option);
                  submit(formData);
                }}
                className="cursor-pointer px-6 py-1 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-[hsl(209,23%,25%)]"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Form>
  );
}