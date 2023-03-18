import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonTypes from "./Pages/PokemonTypes/PokemonTypes";
import PokemonType from "./Pages/PokemonTypes/PokemonType";
import Pokemon from "./Pages/PokemonProfile/Pokemon";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/types" element={<PokemonTypes />} />
          <Route path="/types/:id" element={<PokemonType />} />
          <Route path="/pokemon/:name" element={<Pokemon />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
