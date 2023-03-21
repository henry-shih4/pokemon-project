import { createContext } from "react";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const PokemonContext = createContext();

function PokemonProvider(props) {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/?limit=1500"
  );

  const pokeFun = async () => {
    setLoading(true);
    console.log("running expensive as fk fetch");
    const res = await axios.get(url);
    await getPokemon(res.data.results);
    setLoading(false);
    console.log("fetch finished");
  };

  const getPokemon = async (res) => {
    return await Promise.all(
      res.map(async (item) => {
        const result = await axios.get(item.url);
        setPokeData((state) => {
          state = [...state, result.data];
          state.sort((a, b) => (a.id > b.id ? 1 : -1));
          return state;
        });
        setLoading(true);
        return loading;
      })
    );
  };

  const pokeList = useMemo(() => {
    return pokeData;
  }, [pokeData]);

  useEffect(() => {
    pokeFun();
  }, [url]);

  return (
    <PokemonContext.Provider value={{ pokeList, loading }}>
      {props.children}
    </PokemonContext.Provider>
  );
}

export { PokemonProvider, PokemonContext };
