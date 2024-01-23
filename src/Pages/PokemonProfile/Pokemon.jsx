import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "./Card";
import Navigation from "../../components/Navigation";
import Loading from "../../components/Loading";
import EvolutionChain from "./EvolutionChain";
import { PokemonContext } from "../../components/PokemonContext";



export default function Pokemon() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pokeData, setPokeData] = useState([]);
  const { state } = useLocation();
  const [speciesData, setSpeciesData] = useState();
  const [evolutionData, setEvolutionData] = useState();
  const [baseEvo, setBaseEvo] = useState("");
  const [firstEvo, setFirstEvo] = useState("");
  const [secondEvo, setSecondEvo] = useState("");
  const [evolutions, setEvolutions] = useState(null);
  const { pokeList, loading } = useContext(PokemonContext);
  const [speciesLoading, setSpeciesLoading] = useState(false);
  const [speciesError, setSpeciesError] = useState(false);

  const fetchPokemon = async () => {
    console.log("making new fetch request");
    const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    setPokeData(data.data);
  };

  const fetchSpecies = async () => {

    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${id.split("-")[0]}/`)
      .then((response) => {
        setSpeciesLoading(true);
        setSpeciesData(response.data);
        return response;
      })
      .catch((error) => {
        console.log(error);
        setSpeciesError(true);
      })
      .then((response) => {
        axios.get(response.data.evolution_chain.url).then((response) => {
          
          setEvolutionData(response.data);
          setSpeciesLoading(false);
        });
      })
      .catch((error) => {
        console.log(error);
        setSpeciesError(true);
      });
  };

  useEffect(() => {
    fetchSpecies();
    if (state) {
      setPokeData(state.item);
    } else {
      fetchPokemon();
    }
  }, [id]);

  function filterEvolution(base, one, two) {
    
    const first = pokeList.filter((item) => {
      return item.name == base;
    });
    if (one || two) {
      const evolve = pokeList.filter((item) => {
        return item.name == one || item.name == two || item.name.includes(one) || item.name.includes(two);
      });
      const evolutions = [...first, ...evolve];
      setEvolutions(evolutions);
    }
  }

  useEffect(()=>{
    // console.log(evolutions)
    console.log(evolutionData)
  },[pokeList])

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
        evolutionData.chain.evolves_to[0] &&
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
        evolutionData.chain.evolves_to[0] &&
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
      if (
        evolutionData.chain.evolves_to[0].evolution_details[0]
      ) {
        for (const [key, value] of Object.entries(
          evolutionData.chain.evolves_to[0].evolution_details[0]
        )) {
          console.log(`${key}: ${value}`);
        }
        // setFirstEvo({
        //   evolution: evolutionData.chain.evolves_to[0].species.name,
        //   trigger:
        //     evolutionData.chain.evolves_to[0].evolution_details[0].trigger.name,
        //   level: "happiness",
        // });
      }
    }
  }, [evolutionData]);

  useEffect(() => {
    if (firstEvo || secondEvo) {
      console.log(firstEvo)
      console.log(secondEvo)
      filterEvolution(baseEvo, firstEvo.evolution, secondEvo.evolution);
    }
  }, [firstEvo, secondEvo, pokeList]);

  useEffect(() => {
    // console.log(baseEvo);
    // console.log(evolutionData);
    // console.log(evolutions);
    // console.log(baseEvo, firstEvo, secondEvo);
    // console.log(speciesData);
    // console.log(pokeData);
  });

  return (
    <>
      <Navigation/>
      <div>
        {pokeData.name && speciesData ? (
          <>
            <Card
              name={pokeData.name}
              img={pokeData.sprites.front_default}
              id={pokeData.id}
              stats={pokeData.stats}
              abilities={pokeData.abilities}
              types={pokeData.types}
              description={speciesData.flavor_text_entries}
              generation={speciesData.generation.name}
            />
          </>
        ) : null}
      </div>

      <EvolutionChain
        evolutions={evolutions}
        speciesLoading={speciesLoading}
        speciesError={speciesError}
        firstEvo={firstEvo}
        secondEvo={secondEvo}
      />
    </>
  );
}
