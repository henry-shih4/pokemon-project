import React from "react";
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { PokemonContext } from "../components/PokemonContext";
import { NavLink, useNavigate } from "react-router-dom";

const Search = styled.input`
  flex: 1;
  padding: 10px;
  border: 2px solid #e1e1e1;
  border-radius: 5px;
  font-size: 16px;
  margin: 10px;
`;

const SearchContainer = styled.div``;

const Form = styled.div``;

const DropDown = styled.div`
  position: absolute;
  bottom: full;
  cursor: pointer;
`;

const Sprite = styled.img`
  height: 60px;
  width: 60px;
  cursor: pointer;
`;

const Result = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-transform: capitalize;
`;

function SearchPokemon() {
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
    <Form>
      <label htmlFor="search">Pokemon Name or Pokedex Number</label>
      <SearchContainer>
        <Search
          id="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value.toLowerCase());
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
    </Form>
  );
}

export default SearchPokemon;
