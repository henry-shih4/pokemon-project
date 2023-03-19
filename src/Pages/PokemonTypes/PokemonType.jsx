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
  const { typeName } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(
    `https://pokeapi.co/api/v2/type/${typeName}`
  );

  return (
    <>
      <div>hello from {typeName}</div>
      <Container>
        {data.pokemon ? (
          <div>
            {data.pokemon.map((item) => {
              return (
                <Pokemon
                  key={item.pokemon.name}
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
