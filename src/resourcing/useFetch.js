import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPokemon = async () => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    const pokemon = data.results;
    setData(pokemon);
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return { data, loading };
};
