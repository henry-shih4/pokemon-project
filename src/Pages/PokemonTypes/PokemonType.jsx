import React from "react";
import { useFetch } from "../../resourcing/useFetch";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PokemonType() {
  const [pokemon, setPokemon] = useState([]);
  const { id } = useParams();
  //   const { data, loading } = useFetch(`https://pokeapi.co/api/v2/type/${id}`);
  useEffect(() => {
    getType();
  }, []);

  async function getType() {
    await axios
      .get(`https://pokeapi.co/api/v2/type/${id}`)
      .then((response) => {
        console.log(response.data.pokemon);
        setPokemon(response.data.pokemon);
      })
      .catch((e) => console.log(e));
  }

  return (
    <>
      <div>hello from pokemonType {id}</div>
      <div>
        {pokemon ? (
          <div>
            {pokemon.map((item) => {
              return <div>{item.pokemon.name}</div>;
            })}
          </div>
        ) : null}
      </div>
    </>
  );
}
