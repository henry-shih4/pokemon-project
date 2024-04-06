import { createContext } from "react";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import ErrorPage from "./ErrorPage";

const PokemonContext = createContext();

function PokemonProvider(props) {
  const [pokeData, setPokeData] = useState([]);
  const [pokeInfo, setPokeInfo] = useState([]);
  const [speciesLoading, setSpeciesLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon-species/?limit=1500"
  );
  const [errorPage, setErrorPage] = useState(false);

  const pokeFun = async () => {
    setSpeciesLoading(true);
    setLoading(true);
    const res = await axios.get(url);
    await getPokemon(res.data.results);
    setSpeciesLoading(false);
    setLoading(false);
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
        setSpeciesLoading(true);
        return loading;
      })
    );
  };

  useEffect(() => {
    fetchInfo(pokeData);
  }, [speciesLoading]);

  const fetchInfo = async (res) => {
    return await Promise.all(
      res.map(async (item) => {
        const result = await axios
          .get(`https://pokeapi.co/api/v2/pokemon/${item.id}`)
          .catch((error) => {
            setErrorPage(true);
            return error;
          });
        setPokeInfo((state) => {
          state = [...state, result.data];
          state.sort((a, b) => (a.id > b.id ? 1 : -1));
          return state;
        });
      })
    );
  };

  const pokeList = useMemo(() => {
    return pokeInfo;
  }, [pokeInfo]);

  useEffect(() => {
    pokeFun();
  }, []);

  return (
    <>
      {errorPage ? (
        <ErrorPage />
      ) : (
        <PokemonContext.Provider value={{ pokeList, loading }}>
          {props.children}
        </PokemonContext.Provider>
      )}
    </>
  );
}

export { PokemonProvider, PokemonContext };
