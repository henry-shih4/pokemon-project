import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPokemon = async () => {
    try {
      if (!url) {
        return;
      }
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return { data, loading, error };
};
