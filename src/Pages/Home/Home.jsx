import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../components/Loading";
import { useContext } from "react";
import { PokemonContext } from "../../components/PokemonContext";

const Container = styled.section`
  height: 100dvh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Links = styled.div`
  display: flex;
  gap: 0 1rem;
`;

const ButtonLink = styled(NavLink)`
  background-color: lightblue;
  padding: 1em;
  border-radius: 14px;
`;

const LoadingScreen = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  place-content: center;
`;
export default function Home() {
  const { loading } = useContext(PokemonContext);

  return (
    <>
      {loading ? (
        <LoadingScreen>
          <Loading />
        </LoadingScreen>
      ) : (
        <Container>
          <h1>Welcome to the Pokedex!</h1>
          <Links>
            <ButtonLink to="/types">Type</ButtonLink>
            <ButtonLink to="/generation">Generation</ButtonLink>
          </Links>
        </Container>
      )}
    </>
  );
}
