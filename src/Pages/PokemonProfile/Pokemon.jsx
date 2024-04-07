import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios, { all } from "axios";
import Card from "./Card";
import EvolutionChain from "./EvolutionChain";
import { PokemonContext } from "../../components/PokemonContext";
import Loading from "../../components/Loading";
import styled from "styled-components";
import ErrorPage from "../../components/ErrorPage";

const LoadingScreen = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  place-content: center;
`;

export default function Pokemon() {
  const { id } = useParams();
  const [pokeData, setPokeData] = useState([]);
  const { state } = useLocation();
  const [speciesData, setSpeciesData] = useState();
  const [evolutionData, setEvolutionData] = useState();
  const [evolutions, setEvolutions] = useState(null);
  const [allEvolutions, setAllEvolutions] = useState([]);
  const { pokeList, loading } = useContext(PokemonContext);
  const [speciesLoading, setSpeciesLoading] = useState(false);
  const [speciesError, setSpeciesError] = useState(false);
  const [altForms, setAltForms] = useState([]);
  const [evoLoading, setEvoLoading] = useState(true);
  const [abilityText, setAbilityText] = useState([]);
  const [abilityLoading, setAbilityLoading] = useState(false);
  const [errorPage, setErrorPage] = useState(false);

  const fetchPokemon = async () => {

    const pokeInfo = await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .catch((error) => {
        setErrorPage(true);
        return error;
      });
    setPokeData(pokeInfo.data);
  };

  const fetchAbilityData = async () => {
    if (pokeData.abilities) {
      setAbilityLoading(true);
      let abilities = pokeData.abilities;

      let ability_urls = [];
      for (let i = 0; i < abilities.length; i++) {
        ability_urls.push(abilities[i].ability.url);
      }
      let ability_texts = [];
      for (const url of ability_urls) {
        let ability_data = await axios.get(url);
        let desc = ability_data.data.flavor_text_entries;

        if (id == 681) {
          ability_texts.push(desc[43]);
        } else {
          ability_texts.push(desc[desc.length - 1]);
        }
      }
      setAbilityText(ability_texts);
      setAbilityLoading(false);
    }
  };

  const fetchSpecies = async () => {
    if (id <= 1025) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
        .then((response) => {
          setSpeciesLoading(true);
          setSpeciesData(response.data);
          return response;
        })
        .catch((error) => {
          
          setSpeciesError(true);
          return error
        })
        .then((response) => {
          axios.get(response.data.evolution_chain.url).then((response) => {
            setEvolutionData(response.data);
            setSpeciesLoading(false);
          });
        })
        .catch((error) => {
          setSpeciesError(true);
          return error
        });
    }
  };

  useEffect(() => {
    if (pokeData) {
      fetchAbilityData();
    }
  }, [pokeData]);

  useEffect(() => {
    fetchSpecies();
    if (state) {
      setPokeData(state.item);
    } else {
      fetchPokemon();
    }
  }, [id]);

  async function filterEvolution(list) {
    if (speciesData) {
      let forms = [];
      for (let i = 1; i < speciesData.varieties.length; i++) {
        let form = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${speciesData.varieties[i].pokemon.name}`
        );
        forms.push(form.data);
      }
      setAltForms(forms);
    }

    let evolution = [];
    // const first = pokeList.filter((item) => {
    //   return item.name == list[0];
    // });

    for (let i = 0; i < list.length; i++) {
      let evo = "";
      evo = pokeList.find((item) => {
        if (item.name == list[i].evolution) {
          return item.name == list[i].evolution;
        } else {
          return;
        }
      });

      if (evo == undefined) {
        evo = pokeList.find((item) => {
          return item.name.includes(list[i].evolution);
        });
      }

      evolution = [...evolution, evo];
    }

    setEvolutions(evolution.slice(0, allEvolutions.length));
  }

  useEffect(() => {
    if (evolutionData) {
      let evoChain = [];
      let evoData = evolutionData.chain;
      let splitEvo = false;
      let doubleEvo = false;
      let splitContinue = false;
      do {
        let numberOfEvolutions = evoData["evolves_to"].length;

        if (numberOfEvolutions > 1) {
          splitEvo = true;
          let specialA = [];
          let special = {};
          if (evoData.evolution_details[0]) {
            for (const [key, value] of Object.entries(
              evoData.evolution_details[0]
            )) {
              if (value === "") {
                special[key] = false;
              }
              if (value || value === 0) {
                special[key] = value;
              }
            }
            specialA.push(special);
            evoChain.push({
              evolution: evoData.species.name,
              splitEvo: false,
              special: specialA,
            });
          } else {
            evoChain.push({
              evolution: evoData.species.name,
              splitEvo: false,
            });
          }
          for (let i = 0; i < numberOfEvolutions; i++) {
            let currentEvo = evoData.evolves_to[i];

            const specialA = [];
            let currentEvoDetails = currentEvo.evolution_details;
            for (let j = 0; j <= currentEvoDetails.length; j++) {
              if (currentEvoDetails[j]) {
                let special = {};
                for (const [key, value] of Object.entries(
                  currentEvoDetails[j]
                )) {
                  if (value === "") {
                    special[key] = false;
                  }
                  if (value || value === 0) {
                    special[key] = value;
                  }
                }
                specialA.push(special);
              }
            }
            evoChain.push({
              evolution: currentEvo.species.name,
              special: specialA,
              splitEvo: splitEvo,
            });
          }

          for (let i = 0; i < evoData.evolves_to.length; i++) {
            if (numberOfEvolutions > 1 && evoData.evolves_to[i].evolves_to[0]) {

              if (
                evoData.evolves_to[i].evolves_to[0].species['name'] =='hydrapple'
              ) {
                splitContinue = true
              } 
              doubleEvo = true;
              const specialA = [];
              let currentEvoDetails =
                evoData.evolves_to[i].evolves_to[0].evolution_details;

              for (let j = 0; j <= currentEvoDetails.length; j++) {
                if (currentEvoDetails[j]) {
                  let special = {};
                  for (const [key, value] of Object.entries(
                    currentEvoDetails[j]
                  )) {
                    if (value === "") {
                      special[key] = false;
                    }
                    if (value || value === 0) {
                      special[key] = value;
                    }
                  }
                  specialA.push(special);
                }
              }

              evoChain.push({
                evolution: evoData.evolves_to[i].evolves_to[0].species.name,
                splitEvo: splitEvo,
                doubleEvo: doubleEvo,
                special: specialA,
              });
            }
          }
        } else {
          const specialA = [];
          let currentEvo = evoData.species.name;
          for (let i = 0; i < evoData.evolution_details.length; i++) {
            if (evoData.evolution_details[i]) {
              let special = {};
              for (const [key, value] of Object.entries(
                evoData.evolution_details[i]
              )) {
                if (value === "") {
                  special[key] = false;
                }
                if (value) {
                  special[key] = value;
                }
              }
              specialA.push(special);
            }
          }

          evoChain.push({
            evolution: evoData.species.name,
            special: specialA,
            splitEvo: splitEvo,
          });
        }

        evoData = evoData["evolves_to"][0];
      } while (!!evoData && evoData.hasOwnProperty("evolves_to"));

      if (splitEvo) {
        evoChain.pop();
      }

      if (doubleEvo && !splitContinue) {
        evoChain.pop();
      }

      setAllEvolutions(evoChain);
    }
  }, [evolutionData]);

  useEffect(() => {
    if (allEvolutions) {
      filterEvolution(allEvolutions);
    }
  }, [allEvolutions, pokeList]);

  useEffect(() => {
    if (evolutions && evolutions[0] !== undefined) {
      setEvoLoading(false);
    }
  }, [evolutions]);
  return (
    <>
      {errorPage ? (
        <ErrorPage />
      ) : (
        <div>
          {pokeData.name && speciesData && pokeData.sprites.other ? (
            <>
              <Card
                name={pokeData.name}
                img={pokeData.sprites}
                art={
                  pokeData.sprites.other["official-artwork"]["front_default"]
                }
                id={pokeData.id}
                stats={pokeData.stats}
                abilities={pokeData.abilities}
                types={pokeData.types}
                description={speciesData.flavor_text_entries}
                generation={speciesData.generation.name}
                abilityText={abilityText}
                height={String(pokeData.height)}
                weight={pokeData.weight}
                abilityLoading={abilityLoading}
                errorPage={errorPage}
              />
              <EvolutionChain
                evolutions={evolutions}
                speciesLoading={speciesLoading}
                speciesError={speciesError}
                allEvolutions={allEvolutions}
                altForms={altForms}
                evoLoading={evoLoading}
              />
            </>
          ) : (
            <LoadingScreen>
              <Loading />
            </LoadingScreen>
          )}
        </div>
      )}
    </>
  );
}
