import {
  // 1. Change: Import createHashRouter instead of createBrowserRouter
  createHashRouter,
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

  // 2. Change: Use createHashRouter
  const router = createHashRouter(
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