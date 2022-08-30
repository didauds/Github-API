import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Repository from "./components/pages/Repository/Repository";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="repos/:login/:name" element={<Repository />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
