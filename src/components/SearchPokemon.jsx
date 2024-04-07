import React from "react";
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { PokemonContext } from "../components/PokemonContext";
import { useNavigate } from "react-router-dom";

const Search = styled.input`
  flex: 1;
  padding: 10px;
  border: 2px solid #e1e1e1;
  border-radius: 5px;
  font-size: 16px;
  margin: 10px;
  width:300px;
`;

const SearchContainer = styled.form`
`;


const DropDown = styled.div`
  position: absolute;
  bottom: full;
  cursor: pointer;
  background-color: #f0f0f0;
  padding-right:20px;
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

  function handleSearchSubmit(){
       setSearch("")
  }
  
  useEffect(() => {
    findResults();
  }, [search]);

  return (
    <SearchContainer

    >
      <Search
        id="search"
        placeholder="Pokemon Name or Pokedex Number"
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
                    handleSearchSubmit()
                  }}
                >
                  <Sprite src={item.sprites.front_default} />

                  <div>{item.name}</div>
                  <div>#{item.id}</div>
                </Result>
              );
            })
          : null}
      </DropDown>
    </SearchContainer>
  );
}

export default SearchPokemon;
