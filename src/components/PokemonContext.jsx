import { createContext } from "react";
import { useState, useEffect, useCallback } from "react";
import { useFetch } from "../resourcing/useFetch";
import axios from "axios";

const PokemonContext = createContext();

function PokemonProvider(props) {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/?limit=1500"
  );
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();

  const pokeFun = async () => {
    console.log("running expensive as fk fetch");
    setLoading(true);
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results);
    setLoading(false);
  };
  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setPokeData((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };

  useEffect(() => {
    pokeFun();
  }, [url]);

  return (
    <PokemonContext.Provider value={{ pokeData, loading }}>
      {props.children}
    </PokemonContext.Provider>
  );
}

export { PokemonProvider, PokemonContext };
