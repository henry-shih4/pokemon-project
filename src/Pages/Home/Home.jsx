import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../components/Loading";
import { useContext, useState, useEffect } from "react";
import { PokemonContext } from "../../components/PokemonContext";
import Navigation from '../../components/Navigation'

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

const Search = styled.input`
  flex: 1;
  padding: 10px;
  border: 2px solid #e1e1e1;
  border-radius: 5px;
  font-size: 16px;
  margin:10px;
`;

const SearchContainer = styled.div``;

const Form = styled.div`

`;

const DropDown = styled.div`
  position: absolute;
  bottom: full;
  cursor: pointer;
`;

const Sprite = styled.img`
  height: 60px;
  width: 60px;
  cursor:pointer;
`;

const Result = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-transform: capitalize;
`;


export default function Home() {
  const { pokeList, loading } = useContext(PokemonContext);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState("");
  const navigate = useNavigate();

  function findResults() {
    const filterList = pokeList.filter((item) => {
      if (!isNaN(parseInt(search))) {
        return item.id === parseInt(search);
      } else {
        return item.name.includes(search);
      }
    });

    setResults(filterList.slice(0, 5));
  }

  useEffect(() => {
    findResults();
  }, [search]);

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
          <NavLink target="_blank" to="https://pokeapi.co/">powered by PokéAPI</NavLink>
          <h2>Search Pokemon by ...</h2>

          <Form />
          <label htmlFor="search">Pokemon Name or Pokedex Number</label>
          <SearchContainer>
            <Search
              id="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <DropDown>
              {results.length && search
                ? results.map((item) => {
                    return (
                      <Result
                        key={item.id}
                        onClick={() => {
                          navigate(`/pokemon/${item.id}`);
                        }}
                      >
                        <Sprite src={item.sprites.front_default} />

                        <div>{item.name}</div>
                      </Result>
                    );
                  })
                : null}
            </DropDown>
          </SearchContainer>

          <Form />
        </Container>
      )}
    </>
  );
}
