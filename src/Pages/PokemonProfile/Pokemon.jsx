import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Card from "./Card";

export default function Pokemon() {
  const { name } = useParams();
  const [pokeData, setPokeData] = useState([]);
  const { state } = useLocation();

  const fetchPokemon = async () => {
    console.log("making new fetch request");
    const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    setPokeData(data.data);
  };

  useEffect(() => {
    if (state) {
      setPokeData(state.item);
    } else {
      fetchPokemon();
    }
  }, []);

  return (
    <>
      <div>
        {pokeData.name ? (
          <>
            <Card
              name={pokeData.name}
              img={pokeData.sprites.front_default}
              id={pokeData.id}
              stats={pokeData.stats}
              abilities={pokeData.abilities}
              types={pokeData.types}
            />
          </>
        ) : null}
      </div>
    </>
  );
}
