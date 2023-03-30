import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Card from "./Card";

import { PokemonContext } from "../../components/PokemonContext";

export default function Pokemon() {
  const { name } = useParams();
  const [pokeData, setPokeData] = useState([]);
  const { state } = useLocation();
  const [speciesData, setSpeciesData] = useState();
  const [evolutionData, setEvolutionData] = useState();
  const [firstEvo, setFirstEvo] = useState(null);
  const [secondEvo, setSecondEvo] = useState(null);
  const [evolutions, setEvolutions] = useState(null);
  const { pokeList, loading } = useContext(PokemonContext);

  const fetchPokemon = async () => {
    console.log("making new fetch request");
    const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    setPokeData(data.data);
  };

  const fetchSpecies = async () => {
    const data = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${name}/`
    );
    setSpeciesData(data.data);

    const evolutionChain = await axios.get(data.data.evolution_chain.url);
    setEvolutionData(evolutionChain.data);
  };

  useEffect(() => {
    fetchSpecies();
    if (state) {
      setPokeData(state.item);
    } else {
      fetchPokemon();
    }
  }, []);

  function filterEvolution(one, two) {
    console.log("filtering evo");
    if (one || two) {
      const evolve = pokeList.filter((item) => {
        return item.name == one || item.name == two;
      });
      setEvolutions(evolve);
    }
  }

  useEffect(() => {
    if (evolutionData) {
      if (evolutionData.chain.evolves_to[0]) {
        setFirstEvo(evolutionData.chain.evolves_to[0].species.name);
      }
      if (evolutionData.chain.evolves_to[0].evolves_to[0]) {
        setSecondEvo(
          evolutionData.chain.evolves_to[0].evolves_to[0].species.name
        );
      }
    }
  }, [evolutionData]);

  useEffect(() => {
    if (firstEvo || secondEvo) {
      filterEvolution(firstEvo, secondEvo);
    }
  }, [firstEvo, secondEvo]);

  useEffect(() => {
    console.log(firstEvo, secondEvo);
  });

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

      {evolutions ? (
        <>
          <div>
            {evolutions[0] ? (
              <img src={evolutions[0].sprites.front_default} />
            ) : null}
          </div>
          {evolutions[1] ? (
            <img src={evolutions[1].sprites.front_default} />
          ) : null}
        </>
      ) : null}
    </>
  );
}
