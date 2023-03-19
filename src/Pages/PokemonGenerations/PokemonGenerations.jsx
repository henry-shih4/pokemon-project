import React from "react";
import { useFetch } from "../../resourcing/useFetch";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background-color: lightblue;
  display: flex;
  flex-direction: column;
  gap: 1rem 0;
  justify-content: center;
  align-items: center;
`;

const Type = styled.div`
  padding: 1em;
  font-size: 24px;
  cursor: pointer;
  background-color: pink;
`;

export default function PokemonTypes() {
  const { data, loading } = useFetch("https://pokeapi.co/api/v2/generation/");
  const navigate = useNavigate();

  return (
    <>
      <h1> pokemon generations</h1>
      <Container>
        {data.results
          ? data.results.map((item) => {
              return (
                <Type
                  key={item.name}
                  onClick={() => {
                    navigate(`/generation/${item.name}`);
                  }}
                >
                  {item.name}
                </Type>
              );
            })
          : null}
      </Container>
    </>
  );
}
