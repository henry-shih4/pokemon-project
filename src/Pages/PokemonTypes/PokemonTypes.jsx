import React from "react";
import { useFetch } from "../../resourcing/useFetch";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background-color: lightblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Type = styled.div`
  padding: 1em;
  font-size: 24px;
  
`;

export default function PokemonTypes() {
  const { data, loading } = useFetch("https://pokeapi.co/api/v2/type/");
  const navigate = useNavigate();

  return (
    <>
      <h1> pokemon types</h1>
      <Container>
        {data.results
          ? data.results.map((item, idx) => {
              return (
                <Type
                  key={idx}
                  onClick={() => {
                    navigate(`/types/${idx + 1}`);
                  }}
                >
                  {item.name}, {idx + 1}
                </Type>
              );
            })
          : null}
      </Container>
    </>
  );
}
