import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import CountryDetail from "./pages/CountryDetail";
import useDarkMode from "./hooks/useDarkMode";
import { countriesLoader } from "./pages/Home";

export default function App() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  // Use HashRouter to make GitHub Pages SPA-friendly
  const router = createHashRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
      >
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
      future={{ v7_startTransition: true }}
    />
  );
}
