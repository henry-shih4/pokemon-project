import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PokemonContext } from "../../components/PokemonContext";

const Container = styled.div`
  background-color: lightgray;
  display: grid;
  width: 90%;
  margin: auto;
  grid-template-columns: auto auto auto;
`;

const Pokemon = styled.div`
  padding: 1em;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
`;

const Title = styled.div`
  text-align: center;
`;

const Sprite = styled.img`
  height: 200px;
  width: 200px;

  image-rendering: pixelated;
`;

export default function PokemonType() {
  const { typeName } = useParams();
  const [pokeList, setPokeList] = useState([]);
  const { pokeData, loading } = useContext(PokemonContext);

  const filterPokemon = () => {
    console.log("filtering..");
    const pokemon = pokeData.filter((item) => {
      return (
        item.types[0].type.name === typeName ||
        (item.types[1] && item.types[1].type.name === typeName)
      );
    });
    setPokeList(pokemon);
  };

  useEffect(() => {
    if (!loading && pokeData.length === 1281) {
      filterPokemon();
    }
  }, [pokeData, loading]);

  useEffect(() => {
    console.log(pokeList);
  }, [pokeList]);

  useEffect(() => {
    console.log(loading);
  });

  return (
    <>
      {loading ? <div>Loading</div> : null}
      <h1>{typeName}</h1>
      <Container>
        {pokeList
          ? pokeList.map((item) => {
              return (
                <Pokemon key={item.id}>
                  <Title>{item.name}</Title>
                  <Sprite src={item.sprites.front_default} />
                </Pokemon>
              );
            })
          : null}
      </Container>
    </>
  );
}
