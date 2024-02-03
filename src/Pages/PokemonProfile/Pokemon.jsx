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
  const [allEvolutions, setAllEvolutions] = useState([])
  const { pokeList, loading } = useContext(PokemonContext);
  const [speciesLoading, setSpeciesLoading] = useState(false);
  const [speciesError, setSpeciesError] = useState(false);
  const [altForms, setAltForms] = useState([])

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

  useEffect(()=>{
    console.log(altForms)
  },[altForms])

  const fetchSpecies = async () => {

    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${id.split("-")[0]}/`)
      .then((response) => {
        setSpeciesLoading(true);
        setSpeciesData(response.data);
        console.log(response.data)
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

  async function filterEvolution(list) {
    console.log("filtering evolutions");
    if(speciesData){
      let forms = []
      for (let i = 1; i<speciesData.varieties.length;i++){
        let form = await axios.get(`https://pokeapi.co/api/v2/pokemon/${speciesData.varieties[i].pokemon.name}`)
        console.log(form)
        forms.push(form.data)
      }
      setAltForms(forms)
    }


    let evolution = []
    let forms = []
    // const first = pokeList.filter((item) => {
    //   return item.name == list[0];
    // });
    
    for (let i = 0; i < list.length; i++){
      console.log(list.length)
    let evo = pokeList.filter((item) => {
      return (
        item.name == list[i].evolution || item.name.includes(list[i].evolution)
      );
      // return item.name == list[i].evolution || item.name.includes(list[i].evolution);
    });

    evolution = [...evolution, ...evo]
    }



    setEvolutions(evolution.slice(0,allEvolutions.length))
    
  }


//   useEffect(()=>{
//     console.log(allEvolutions)
//     console.log(evolutions)
// },[evolutions])

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


  useEffect(()=>{
if (evolutionData) {
let evoChain = [];
let evoData = evolutionData.chain
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

if (numberOfEvolutions>1){
  // evoChain.push({ evolution: evoData.species.name });
  for (let i = 1;i < numberOfEvolutions; i++) {
          const special = []
          
          console.log(i)
          // for (const [key, value] of Object.entries(evoData.evolves_to[i])) {
          //   console.log(`${key}: ${value}`);
          //   if (Number.isInteger(value)) {
          //     console.log(key, value);
          //     special.push([key, value]);
          //   }
          // }
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
    });
  }
}
else{
 evoChain.push({
   evolution: evoData.species.name,
   level: !evoDetails ? null : evoDetails.min_level,
   trigger: !evoDetails ? null : evoDetails.trigger.name,
   item: !evoDetails ? null : evoDetails.item,
 });
}

  evoData = evoData["evolves_to"][0];
} while (!!evoData && evoData.hasOwnProperty("evolves_to"));
console.log(evoChain)
setAllEvolutions(evoChain)
}

  },[evolutionData])



  useEffect(() => {
    if (allEvolutions) {
      filterEvolution(allEvolutions);
    }
  }, [allEvolutions, pokeList]);


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
        allEvolutions={allEvolutions}
        altForms = {altForms}
      />
    </>
  );
}
