import "./App.css";

import { useFetch } from "./resourcing/useFetch";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonTypes from "./Pages/PokemonTypes/PokemonTypes";
import PokemonType from "./Pages/PokemonTypes/PokemonType";

function App() {
  const { data, loading } = useFetch("https://pokeapi.co/api/v2/type/");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/types" element={<PokemonTypes />} />
          <Route path="/types/:id" element={<PokemonType />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
