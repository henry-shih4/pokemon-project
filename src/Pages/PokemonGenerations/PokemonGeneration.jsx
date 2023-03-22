import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState, useMemo, useCallback } from "react";
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
  height: 140px;
  width: 140px;

  image-rendering: pixelated;
`;

const LoadingScreen = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  place-content: center;
`;

export default function PokemonType() {
  const [generationNumber, setGenerationNumber] = useState("1");
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const { pokeList, loading } = useContext(PokemonContext);
  const navigate = useNavigate();

  const generation = useCallback(() => {
    if (generationNumber === "1") {
      setStart(0);
      setEnd(151);
    }
    if (generationNumber === "2") {
      setStart(151);
      setEnd(251);
    }
    if (generationNumber === "3") {
      setStart(251);
      setEnd(386);
    }
    if (generationNumber === "4") {
      setStart(386);
      setEnd(493);
    }
    if (generationNumber === "5") {
      setStart(493);
      setEnd(649);
    }
    if (generationNumber === "6") {
      setStart(649);
      setEnd(721);
    }
    if (generationNumber === "7") {
      setStart(721);
      setEnd(809);
    }
    if (generationNumber === "8") {
      setStart(809);
      setEnd(905);
    }
    if (generationNumber === "9") {
      setStart(905);
      setEnd(1010);
    }
  }, [generationNumber]);

  const pokeData = useMemo(() => {
    generation();
    let pokemon = pokeList;
    return pokemon;
  }, [pokeList, start, end, generation]);

  useEffect(() => {
    console.log(generationNumber);
  });

  return (
    <>
      {loading ? (
        <LoadingScreen>
          <Loading />
        </LoadingScreen>
      ) : (
        <>
          <select
            onChange={(e) => {
              setGenerationNumber(e.target.value);
            }}
          >
            <option value={1}>Generation 1</option>
            <option value={2}>Generation 2</option>
            <option value={3}>Generation 3</option>
            <option value={4}>Generation 4</option>
            <option value={5}>Generation 5</option>
            <option value={6}>Generation 6</option>
            <option value={7}>Generation 7</option>
            <option value={8}>Generation 8</option>
            <option value={9}>Generation 9</option>
          </select>
          <Container>
            {pokeData
              ? pokeData.slice(start, end).map((item) => {
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
      )}
    </>
  );
}
