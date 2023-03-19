import React from "react";
import { useFetch } from "../../resourcing/useFetch";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";

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

export default function PokemonGeneration() {
  const { generationNumber } = useParams();
  //   const { data, loading, error } = useFetch(
  //     `https://pokeapi.co/api/v2/generation/${generationNumber}/`
  //   );

  const navigate = useNavigate();
  const [pokeData, setPokeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const getPokemon = async () => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/generation/${generationNumber}/`
    );
    console.log(response.data.pokemon_species);
    getInfo(response.data.pokemon_species);
  };

  const getInfo = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${item.name}`
      );
      setPokeData((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };

  useEffect(() => {
    getPokemon();
  }, []);

  useEffect(() => {
    console.log(pokeData);
  });

  return (
    <>
      <h1>{generationNumber}</h1>
      {pokeData ? (
        <Container>
          {pokeData.slice(indexOfFirstItem, indexOfLastItem).map((item) => (
            <Pokemon
              key={item.id}
              onClick={() => {
                navigate(`/pokemon/${item.id}`);
              }}
            >
              {item.name}
              <img src={item.sprites.front_default} />
            </Pokemon>
          ))}
          <button
            onClick={() => {
              currentPage > 1 ? setCurrentPage(currentPage - 1) : null;
            }}
          >
            last page
          </button>
          <button
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
          >
            next page
          </button>
        </Container>
      ) : null}
    </>
  );
}
