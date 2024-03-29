import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios, { all } from "axios";
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
  const [evolutions, setEvolutions] = useState(null);
  const [allEvolutions, setAllEvolutions] = useState([]);
  const { pokeList, loading } = useContext(PokemonContext);
  const [speciesLoading, setSpeciesLoading] = useState(false);
  const [speciesError, setSpeciesError] = useState(false);
  const [altForms, setAltForms] = useState([]);
  const [evoLoading, setEvoLoading] = useState(true);
  const [abilityText, setAbilityText] = useState([]);
  const [evoGenData, setEvoGenData] = useState([]);

  const fetchPokemon = async () => {
    console.log("making new fetch request");
    // const data = await axios.get(
    //   `https://pokeapi.co/api/v2/pokemon-species/${id.split("-")[0]}/`
    // );
    // const pokeId = data.data.id
    // console.log(data.data.id)

    const pokeInfo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    setPokeData(pokeInfo.data);
  };

  const fetchAbilityData = async () => {
    if (pokeData.abilities) {
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
    console.log("filtering evolutions");
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
    console.log(pokeData);
  }, [pokeData]);
  useEffect(() => {
    console.log(speciesData);
  }, [speciesData]);

  useEffect(() => {
    if (evolutionData) {
      let evoChain = [];
      let evoData = evolutionData.chain;
      let splitEvo = false;
      let doubleEvo = false;
      console.log(evoData);
      do {
        let numberOfEvolutions = evoData["evolves_to"].length;
        console.log(numberOfEvolutions);

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
            splitEvo = true;
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
            if (numberOfEvolutions > 1 && evoData.evolves_to[0].evolves_to[0]) {
              console.log(evoData.evolves_to[i].evolves_to);
              doubleEvo = true;
              const specialA = [];
              let currentEvoDetails = evoData.evolves_to[i].evolves_to[0].evolution_details;
              console.log(currentEvoDetails)
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
          // if (numberOfEvolutions > 1 && evoData.evolves_to[1].evolves_to[0]) {
          //   console.log(evoData.evolves_to[1].evolves_to);
          //   evoChain.push({
          //     evolution: evoData.evolves_to[1].evolves_to[0].species.name,
          //     splitEvo: true,
          //   });
          //   doubleEvo = true;
          // }
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

      if (doubleEvo) {
        evoChain.pop();
      }

      setAllEvolutions(evoChain);
    }
  }, [evolutionData]);

  useEffect(() => {
    if (allEvolutions) {
      setEvoLoading(true);
      filterEvolution(allEvolutions);
      setEvoLoading(false);
    }
  }, [allEvolutions, pokeList]);

  return (
    <>
      <Navigation />
      <div>
        {pokeData.name && speciesData && pokeData.sprites.other ? (
          <>
            <Card
              name={pokeData.name}
              img={pokeData.sprites}
              art={pokeData.sprites.other["official-artwork"]["front_default"]}
              id={pokeData.id}
              stats={pokeData.stats}
              abilities={pokeData.abilities}
              types={pokeData.types}
              description={speciesData.flavor_text_entries}
              generation={speciesData.generation.name}
              abilityText={abilityText}
              height={String(pokeData.height)}
              weight={pokeData.weight}
            />
          </>
        ) : null}
      </div>

      <EvolutionChain
        evolutions={evolutions}
        speciesLoading={speciesLoading}
        speciesError={speciesError}
        allEvolutions={allEvolutions}
        altForms={altForms}
        evoLoading={evoLoading}
      />
    </>
  );
}
