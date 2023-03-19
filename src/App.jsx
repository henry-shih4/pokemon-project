import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonTypes from "./Pages/PokemonTypes/PokemonTypes";
import PokemonType from "./Pages/PokemonTypes/PokemonType";
import Pokemon from "./Pages/PokemonProfile/Pokemon";
import Home from "./Pages/Home/Home";
import PokemonGenerations from "./Pages/PokemonGenerations/PokemonGenerations";
import PokemonGeneration from "./Pages/PokemonGenerations/PokemonGeneration";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/types" element={<PokemonTypes />} />
          <Route path="/types/:typeName" element={<PokemonType />} />
          <Route path="/pokemon/:name" element={<Pokemon />} />
          <Route path="/generation" element={<PokemonGenerations />} />
          <Route
            path="/generation/:generationNumber"
            element={<PokemonGeneration />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
