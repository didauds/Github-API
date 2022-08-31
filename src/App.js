import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Layout/Header";
import Home from "./pages/Home/Home";
import Commits from "./pages/Commits/Commits";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="repos/:login/:name" element={<Commits />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
