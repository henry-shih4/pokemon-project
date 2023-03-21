import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState, useMemo } from "react";
import { PokemonContext } from "../../components/PokemonContext";
import Loading from "../../components/Loading";
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
  align-items: center;
`;

const Title = styled.div`
  text-align: center;
  text-transform: capitalize;
`;

const Sprite = styled.img`
  height: 200px;
  width: 200px;

  image-rendering: pixelated;
`;

export default function PokemonType() {
  const { typeName } = useParams();
  // const [pokeData, setPokeData] = useState([]);
  const { pokeList, loading } = useContext(PokemonContext);
  const navigate = useNavigate();

  const pokeData = useMemo(() => {
    console.log("filtering..");
    const pokemon = pokeList.filter((item) => {
      return (
        item.types[0].type.name === typeName ||
        (item.types[1] && item.types[1].type.name === typeName)
      );
    });
    return pokemon;
  }, [pokeList]);

  // useEffect(() => {
  //   if (!loading && pokeData.length === 1281) {
  //     filterPokemon();
  //   }
  // }, [pokeData, loading]);

  // useEffect(() => {
  //   console.log(pokeList);
  // }, [pokeList]);

  return (
    <>
      {loading || !pokeData ? <Loading /> : null}
      <h1>{typeName}</h1>
      <Container>
        {pokeData
          ? pokeData.map((item) => {
              return (
                <Pokemon
                  key={item.id}
                  onClick={() => {
                    navigate(`/pokemon/${item.id}`, {
                      state: { item },
                    });
                  }}
                >
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
