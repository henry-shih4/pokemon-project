import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonType from "./Pages/PokemonTypes/PokemonType";
import Pokemon from "./Pages/PokemonProfile/Pokemon";
import Home from "./Pages/Home/Home";
import PokemonGeneration from "./Pages/PokemonGenerations/PokemonGeneration";
import { PokemonProvider } from "./components/PokemonContext";
import { TeamProvider } from "./components/TeamContext";
import TeamBuilder from "./Pages/TeamBuilder/TeamBuilder";
import TypeGuide from "./components/TypeGuide";
import NotFound from "./components/NotFound";
import Navigation from "./components/Navigation";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";

function App() {
  return (
    <div className="App">
      <PokemonProvider>
        <TeamProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/types/:type" element={<PokemonType />} />
              <Route path="/pokemon/:id" element={<Pokemon />} />
              <Route path="/teams" element={<TeamBuilder />} />
              <Route path="/type-guide" element={<TypeGuide />} />
              <Route
                path="/generation/:generationNumber"
                element={<PokemonGeneration />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ScrollToTopButton />
          </BrowserRouter>
        </TeamProvider>
      </PokemonProvider>
    </div>
  );
}

export default App;
