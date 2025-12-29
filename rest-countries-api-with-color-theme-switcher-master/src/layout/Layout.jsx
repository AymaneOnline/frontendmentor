import Header from "../components/Header";

export default function Layout({ children, darkMode, toggleDarkMode }) {
  return (
    <div className="bg-[hsl(0,0%,99%)] text-[hsl(200,15%,8%)] dark:bg-[hsl(207,26%,17%)] dark:text-white min-h-screen flex flex-col">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="py-8 px-6 md:py-8 md:px-8 lg:py-10 lg:px-16 flex-1">
        {children}
      </main>
    </div>
  );
}
