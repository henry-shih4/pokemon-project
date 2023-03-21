import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonTypes from "./Pages/PokemonTypes/PokemonTypes";
import PokemonType from "./Pages/PokemonTypes/PokemonType";
import Pokemon from "./Pages/PokemonProfile/Pokemon";
import Home from "./Pages/Home/Home";
import PokemonGeneration from "./Pages/PokemonGenerations/PokemonGeneration";
import { PokemonProvider } from "./components/PokemonContext";

function App() {
  return (
    <div className="App">
      <PokemonProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/types" element={<PokemonTypes />} />
            <Route path="/types/:typeName" element={<PokemonType />} />
            <Route path="/pokemon/:name" element={<Pokemon />} />
            <Route
              path="/generation"
              element={<PokemonGeneration />}
            />
          </Routes>
        </BrowserRouter>
      </PokemonProvider>
    </div>
  );
}

export default App;
