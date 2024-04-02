import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../components/Loading";
import { useContext, useState, useEffect } from "react";
import { PokemonContext } from "../../components/PokemonContext";
import Navigation from '../../components/Navigation'
import Search from '../../components/SearchPokemon'

const Container = styled.section`
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  height:100vh;
  padding-top:6em;
  background-color: #f0f0f0;
`;


const LoadingScreen = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  place-content: center;
`;



export default function Home() {
  const { pokeList, loading } = useContext(PokemonContext);
  const navigate = useNavigate();


  return (
    <>
      <Navigation></Navigation>
      {loading ? (
        <LoadingScreen>
          <Loading />
        </LoadingScreen>
      ) : (
        <Container>
          <h1>Welcome to the Pokedex!</h1>
          <NavLink target="_blank" to="https://pokeapi.co/">
            powered by PokéAPI
          </NavLink>
          <h2>Search Pokemon by ...</h2>
          <form>
            <label htmlFor="search">Pokemon Name or Pokedex Number</label>
            <Search />
          </form>
        </Container>
      )}
    </>
  );
}
