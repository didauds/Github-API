import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Commits from "./components/pages/Commits/Commits";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="repos/:login/:name" element={<Commits />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
