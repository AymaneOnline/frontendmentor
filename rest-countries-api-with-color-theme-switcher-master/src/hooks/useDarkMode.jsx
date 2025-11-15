import { useState, useEffect } from 'react';

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme
      ? storedTheme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return { darkMode, toggleDarkMode };
}