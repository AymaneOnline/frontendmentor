import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import CountryDetail from "./pages/CountryDetail";
import useDarkMode from "./hooks/useDarkMode";

export default function App() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <BrowserRouter>
      <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/countries/:name" element={<CountryDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
