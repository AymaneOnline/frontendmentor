import Header from "../components/Header"
import { useNavigation, Outlet } from "react-router-dom"
import { MoonLoader } from "react-spinners"

export default function Layout({ darkMode, toggleDarkMode }) {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="bg-[hsl(0,0%,99%)] text-[hsl(200,15%,8%)] dark:bg-[hsl(207,26%,17%)] dark:text-white min-h-screen flex flex-col">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="py-8 px-6 md:py-8 md:px-8 lg:py-10 lg:px-16 flex-1">
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white/70">
            <MoonLoader />
          </div>
        )}
        <Outlet />
      </main>
    </div>
  );
}