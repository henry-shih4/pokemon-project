import React from "react";
import { useFetch } from "../../resourcing/useFetch";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Pokemon = styled.div`
  padding: 1em;
  font-size: 24px;
  cursor: pointer;
`;

export default function PokemonType() {
  const [pokemon, setPokemon] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

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
      <Container>
        {pokemon ? (
          <div>
            {pokemon.map((item, idx) => {
              return (
                <Pokemon
                  key={idx}
                  onClick={() => {
                    navigate(`/pokemon/${item.pokemon.name}`);
                  }}
                >
                  {item.pokemon.name}
                </Pokemon>
              );
            })}
          </div>
        ) : null}
      </Container>
    </>
  );
}
