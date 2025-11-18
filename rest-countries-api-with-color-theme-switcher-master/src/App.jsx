import {
  // Use BrowserRouter for better compatibility with screenshot/crawler tools
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import Layout from "./layout/Layout"
import Home from "./pages/Home"
import CountryDetail from "./pages/CountryDetail"
import useDarkMode from "./hooks/useDarkMode"
import { countriesLoader } from "./pages/Home"

export default function App() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  // Use createBrowserRouter with a 404.html fallback in deployment
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} >
        <Route
          index
          element={<Home />}
          loader={countriesLoader}
          errorElement={<p>Error loading countries</p>}
        />
        <Route path="countries/:name" element={<CountryDetail />} />
      </Route>
    )
  );

  return (
    <RouterProvider
      router={router}
      // You can keep the future prop if you wish, but it's not strictly related to the HashRouter switch.
      future={{ v7_startTransition: true }}
    />
  )
}