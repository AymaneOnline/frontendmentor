import { FaRegMoon, FaMoon } from "react-icons/fa";

export default function Header({ darkMode, toggleDarkMode }) {
  return (
    <header className="bg-white shadow-md dark:bg-[hsl(209,23%,22%)]">
      <nav className="flex justify-between py-8 px-6">
        <h1 className="font-bold text-lg">Where in the world?</h1>
        <button
          className="flex items-center gap-2 cursor-pointer"
          onClick={toggleDarkMode}
        >
          {darkMode ? <FaMoon /> : <FaRegMoon />}
          Dark Mode
        </button>
      </nav>
    </header>
  );
}