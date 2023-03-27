import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../components/Loading";
import { useContext, useState, useEffect } from "react";
import { PokemonContext } from "../../components/PokemonContext";

const Container = styled.section``;

const Links = styled.div`
  display: flex;
  gap: 0 1rem;
`;

const ButtonLink = styled(NavLink)`
  background-color: #066b8d;
  padding: 1em;
  border-radius: 14px;
  text-decoration: none;
  font-size: 20px;
  width: 100px;
  text-align: center;
  color: white;
`;

const LoadingScreen = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  place-content: center;
`;

const Search = styled.input``;

const SearchContainer = styled.div``;

const Form = styled.div`

`;

const DropDown = styled.div`
  position: absolute;
  bottom: full;
`;

const Sprite = styled.img`
  height: 60px;
  width: 60px;
`;

const Result = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
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
      {loading ? (
        <LoadingScreen>
          <Loading />
        </LoadingScreen>
      ) : (
        <Container>
          <h1>Welcome to the Pokedex!</h1>
          <h2>See Pokemon by</h2>
          <Links>
            <ButtonLink to="/types">Type</ButtonLink>
            <ButtonLink to="/generation">Generation</ButtonLink>
          </Links>

          <Form />
          <label htmlFor="search">Pokemon Name/Number</label>
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
                        onClick={() => {
                          navigate(`/pokemon/${item.name}`);
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
