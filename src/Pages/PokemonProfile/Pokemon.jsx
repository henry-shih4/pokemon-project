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
  const [evoGenData, setEvoGenData] = useState([])

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
        
        if (id == 681){
          ability_texts.push(desc[43]);
        }
        else{
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

      if (evo == undefined){
        evo = pokeList.find((item)=>{
          return (
            item.name.includes(list[i].evolution)
          );
        })
      }

      evolution = [...evolution, evo];

    }

    setEvolutions(evolution.slice(0, allEvolutions.length));
  }

  useEffect(() => {
    console.log(pokeData);
  }, [pokeData]);

  // useEffect(() => {
  //   if (evolutionData) {
  //     setBaseEvo(evolutionData.chain.species.name);
  //       console.log(evolutionData)
  //     if (
  //       evolutionData.chain.evolves_to[0] &&
  //       evolutionData.chain.evolves_to[0].evolution_details[0].trigger.name !==
  //         "use-item"
  //     ) {
  //       setFirstEvo({
  //         evolution: evolutionData.chain.evolves_to[0].species.name,
  //         trigger:
  //           evolutionData.chain.evolves_to[0].evolution_details[0].trigger.name,
  //         level:
  //           evolutionData.chain.evolves_to[0].evolution_details[0].min_level,
  //       });
  //     }
  //     if (
  //       evolutionData.chain.evolves_to[0] &&
  //       evolutionData.chain.evolves_to[0].evolves_to[0] &&
  //       evolutionData.chain.evolves_to[0].evolves_to[0].evolution_details[0]
  //         .trigger.name !== "use-item"
  //     ) {
  //       setSecondEvo({
  //         evolution:
  //           evolutionData.chain.evolves_to[0].evolves_to[0].species.name,
  //         trigger:
  //           evolutionData.chain.evolves_to[0].evolves_to[0].evolution_details[0]
  //             .trigger.name,
  //         level:
  //           evolutionData.chain.evolves_to[0].evolves_to[0].evolution_details[0]
  //             .min_level,
  //       });
  //     } else if (
  //       evolutionData.chain.evolves_to[0] &&
  //       evolutionData.chain.evolves_to[0].evolution_details[0].trigger.name ===
  //         "use-item"
  //     ) {
  //       setFirstEvo({
  //         evolution: evolutionData.chain.evolves_to[0].species.name,
  //         trigger:
  //           evolutionData.chain.evolves_to[0].evolution_details[0].trigger.name,
  //         item: evolutionData.chain.evolves_to[0].evolution_details[0].item
  //           .name,
  //       });
  //     } else if (
  //       evolutionData.chain.evolves_to[0] &&
  //       evolutionData.chain.evolves_to[0].evolves_to[0] &&
  //       evolutionData.chain.evolves_to[0].evolves_to[0].evolution_details[0]
  //         .trigger.name === "use-item"
  //     ) {
  //       setSecondEvo({
  //         evolution:
  //           evolutionData.chain.evolves_to[0].evolves_to[0].species.name,
  //         trigger:
  //           evolutionData.chain.evolves_to[0].evolves_to[0].evolution_details[0]
  //             .trigger.name,
  //         item: evolutionData.chain.evolves_to[0].evolves_to[0]
  //           .evolution_details[0].item.name,
  //       });
  //     }
  //     if ( evolutionData.chain.evolves_to[0] &&
  //       evolutionData.chain.evolves_to[0].evolution_details[0]
  //     ) {
  //       console.log(evolutionData.chain.evolves_to[0].evolution_details[0]);
  //       const special = []
  //       for (const [key, value] of Object.entries(
  //         evolutionData.chain.evolves_to[0].evolution_details[0]
  //       )) {
  //       console.log(`${key}: ${value}`);
  //         if (Number.isInteger(value) ){
  //           console.log(key, value);
  //           special.push([key,value])
  //           setFirstEvo({
  //             evolution: evolutionData.chain.evolves_to[0].species.name,
  //             trigger:
  //               evolutionData.chain.evolves_to[0].evolution_details[0].trigger.name,
  //             level: `${key}, ${value}`,
  //           });
  //         }

  //       }
  //       // setFirstEvo({
  //       //   evolution: evolutionData.chain.evolves_to[0].species.name,
  //       //   trigger:
  //       //     evolutionData.chain.evolves_to[0].evolution_details[0].trigger.name,
  //       //   level: "happiness",
  //       // });
  //       console.log(special)
  //     }
  //   }
  // }, [evolutionData]);

  useEffect(() => {
    if (evolutionData) {
      let evoChain = [];
      let evoData = evolutionData.chain;
      console.log(evoData);
      do {
        //  if (evoData.evolves_to[0]) {
        //       evoChain.push({name: evoData.species.name, details:evoData.evolves_to[0].evolution_details[0]});

        //   }

        //   if (numberOfEvolutions>1){
        //    for (let i = 0;i < numberOfEvolutions; i++) {
        //     evoChain.push({ name: evoData.evolves_to[i].species.name });
        //     if (evoData.evolves_to[i + 1]) {
        // console.log(evoData.evolves_to[i+1].evolution_details[0]);
        // }
        //    }
        //   }
        // console.log(evoData)
        var evoDetails = evoData["evolution_details"][0];
        let numberOfEvolutions = evoData["evolves_to"].length;

        if (numberOfEvolutions > 1) {
          const special = {};
          if (evoData.evolution_details[0]) {
            for (const [key, value] of Object.entries(
              evoData.evolution_details[0]
            )) {
              if (Number.isInteger(value) || value == 0 || key == "location") {
                console.log(key, value);
                special[key] = value;
              }
            }
          }
          evoChain.push({
            evolution: evoData.species.name,
            level: !evoDetails ? null : evoDetails.min_level,
            trigger: !evoDetails ? null : evoDetails.trigger.name,
            item: !evoDetails ? null : evoDetails.item,
            special: special,
          });
          for (let i = 1; i < numberOfEvolutions; i++) {
            const special = {};

            console.log(i);
            console.log(evoData.evolves_to[i]);
            for (const [key, value] of Object.entries(
              evoData.evolves_to[i].evolution_details[0]
            )) {
              if (
                Number.isInteger(value) ||
                key == "time_of_day" ||
                value == 0 ||
                key == "location"
              ) {
                if (value !== "") {
                  special[key] = value;
                }
              }
            }
            evoChain.push({
              evolution: evoData.evolves_to[i].species.name,
              level: evoData.evolves_to[i].evolution_details
                ? evoData.evolves_to[i].evolution_details[0].min_level
                : null,
              trigger: evoData.evolves_to[i].evolution_details
                ? evoData.evolves_to[i].evolution_details[0].trigger.name
                : null,
              item: evoData.evolves_to[i].evolution_details
                ? evoData.evolves_to[i].evolution_details[0].item
                : null,
              special: special,
            });
          }
        } else {
          console.log(evoData);
          const specialA = [];
          for (let i = 0;i<evoData.evolution_details.length;i++){
          if (evoData.evolution_details[i]) {
            let special = {};
            for (const [key, value] of Object.entries(
              evoData.evolution_details[i]
            )) {
              if (Number.isInteger(value) || value == 0 || key == "location") {
                console.log(key, value);
                
                special[key] = value;
              }
            }
            specialA.push(special);
          }
            console.log(specialA)
          }

          evoChain.push({
            evolution: evoData.species.name,
            level: !evoDetails ? null : evoDetails.min_level,
            trigger: !evoDetails ? null : evoDetails.trigger.name,
            item: !evoDetails ? null : evoDetails.item,
            special: specialA,
          });
        }

        evoData = evoData["evolves_to"][0];
      } while (!!evoData && evoData.hasOwnProperty("evolves_to"));
      console.log(evoChain);
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
              abilityText={abilityText}
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
