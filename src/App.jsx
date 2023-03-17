import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    fetchPokemon();
  }, []);

  useEffect(() => {
    console.log(pokemonList);
  });

  async function fetchPokemon() {
    await axios
      .get("https://pokeapi.co/api/v2/pokemon/?limit=1281")
      .then((data) => {
        setPokemonList(data.data.results);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="App">
      <h1>hello world</h1>
      {pokemonList !== []
        ? pokemonList.map((item, idx) => {
            return (
              <div>
                {item.name}, {idx + 1}
              </div>
            );
          })
        : null}
    </div>
  );
}

export default App;
