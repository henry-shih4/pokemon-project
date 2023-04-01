import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Card from "./Card";
import Loading from "../../components/Loading";
import { PokemonContext } from "../../components/PokemonContext";

export default function Pokemon() {
  const { name } = useParams();
  const [pokeData, setPokeData] = useState([]);
  const { state } = useLocation();
  const [speciesData, setSpeciesData] = useState();
  const [evolutionData, setEvolutionData] = useState();
  const [baseEvo, setBaseEvo] = useState("");
  const [firstEvo, setFirstEvo] = useState("");
  const [secondEvo, setSecondEvo] = useState("");
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
    console.log(evolutionChain);
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

  function filterEvolution(base, one, two) {
    console.log("filtering evo");
    if (one || two) {
      const evolve = pokeList.filter((item) => {
        return item.name == base || item.name == one || item.name == two;
      });
      setEvolutions(evolve);
    }
  }

  useEffect(() => {
    if (evolutionData) {
      setBaseEvo(evolutionData.chain.species.name);

      if (
        evolutionData.chain.evolves_to[0] &&
        evolutionData.chain.evolves_to[0].evolution_details[0].trigger.name !==
          "use-item"
      ) {
        setFirstEvo({
          evolution: evolutionData.chain.evolves_to[0].species.name,
          trigger:
            evolutionData.chain.evolves_to[0].evolution_details[0].trigger.name,
          level:
            evolutionData.chain.evolves_to[0].evolution_details[0].min_level,
        });
      }
      if (
        evolutionData.chain.evolves_to[0].evolves_to[0] &&
        evolutionData.chain.evolves_to[0].evolves_to[0].evolution_details[0]
          .trigger.name !== "use-item"
      ) {
        setSecondEvo({
          evolution:
            evolutionData.chain.evolves_to[0].evolves_to[0].species.name,
          trigger:
            evolutionData.chain.evolves_to[0].evolves_to[0].evolution_details[0]
              .trigger.name,
          level:
            evolutionData.chain.evolves_to[0].evolves_to[0].evolution_details[0]
              .min_level,
        });
      } else if (
        evolutionData.chain.evolves_to[0] &&
        evolutionData.chain.evolves_to[0].evolution_details[0].trigger.name ===
          "use-item"
      ) {
        setFirstEvo({
          evolution: evolutionData.chain.evolves_to[0].species.name,
          trigger:
            evolutionData.chain.evolves_to[0].evolution_details[0].trigger.name,
          item: evolutionData.chain.evolves_to[0].evolution_details[0].item
            .name,
        });
      } else if (
        evolutionData.chain.evolves_to[0].evolves_to[0] &&
        evolutionData.chain.evolves_to[0].evolves_to[0].evolution_details[0]
          .trigger.name === "use-item"
      ) {
        setSecondEvo({
          evolution:
            evolutionData.chain.evolves_to[0].evolves_to[0].species.name,
          trigger:
            evolutionData.chain.evolves_to[0].evolves_to[0].evolution_details[0]
              .trigger.name,
          item: evolutionData.chain.evolves_to[0].evolves_to[0]
            .evolution_details[0].item.name,
        });
      }
    }
  }, [evolutionData]);

  useEffect(() => {
    if (firstEvo || secondEvo) {
      filterEvolution(baseEvo, firstEvo.evolution, secondEvo.evolution);
    }
  }, [firstEvo, secondEvo, evolutionData]);

  useEffect(() => {
    console.log(evolutionData);
    console.log(evolutions);
    console.log(baseEvo, firstEvo, secondEvo);
    console.log(speciesData);
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
              <>
                <img src={evolutions[0].sprites.front_default} />
              </>
            ) : null}
          </div>
          <div>
            <div>{firstEvo.level ? firstEvo.level : null}</div>
            <div>{firstEvo.item ? firstEvo.item : null}</div>
          </div>
          <div>
            {evolutions[1] ? (
              <>
                <img src={evolutions[1].sprites.front_default} />
              </>
            ) : null}
          </div>
          <div>
            <div>{secondEvo.level ? secondEvo.level : null}</div>
            <div>{secondEvo.item ? secondEvo.item : null}</div>
            <div>{secondEvo.trigger ? secondEvo.trigger : null}</div>
          </div>
          <div>
            {evolutions[2] ? (
              <img src={evolutions[2].sprites.front_default} />
            ) : null}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
