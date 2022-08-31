import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import Home from "./pages/Home/Home";
import Commits from "./pages/Commits/Commits";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div id={theme}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="repos/:login/:name" element={<Commits />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
