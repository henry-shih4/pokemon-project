import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { PokemonContext } from "./PokemonContext";
import { useNavigate } from "react-router-dom";

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Search = styled.input`
  width: 100%;
  padding: var(--spacing-md);
  border: 2px solid #e1e1e1;
  border-radius: var(--radius-md);
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: var(--shadow-sm);
  }
`;

const DropDown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
`;

const Result = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--background);
  }

  .name {
    flex: 1;
    text-transform: capitalize;
    color: var(--text-primary);
  }

  .id {
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
`;

const Sprite = styled.img`
  height: 60px;
  width: 60px;
  object-fit: contain;
`;

const NoResults = styled.div`
  padding: var(--spacing-md);
  text-align: center;
  color: var(--text-secondary);
`;

function SearchPokemon({ onSelect }) {
  const { pokeList } = useContext(PokemonContext);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (search.trim()) {
      const filterList = pokeList.filter((item) => {
        if (!isNaN(parseInt(search))) {
          return item.id === parseInt(search);
        } else {
          return item.name.toLowerCase().includes(search.toLowerCase());
        }
      });
      setResults(filterList.slice(0, 5));
    } else {
      setResults([]);
    }
  }, [search, pokeList]);

  const handleResultClick = (pokemon) => {
    if (onSelect) {
      onSelect(pokemon);
    } else {
      navigate(`/pokemon/${pokemon.id}`);
    }
    setSearch("");
    setResults([]);
  };

  return (
    <SearchContainer>
      <Search
        type="text"
        placeholder="Search Pokémon by name or number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        autoComplete="off"
      />

      {results.length > 0 && (
        <DropDown>
          {results.map((pokemon) => (
            <Result key={pokemon.id} onClick={() => handleResultClick(pokemon)}>
              <Sprite src={pokemon.sprites.front_default} alt={pokemon.name} />
              <span className="name">{pokemon.name}</span>
              <span className="id">#{pokemon.id}</span>
            </Result>
          ))}
        </DropDown>
      )}

      {search.trim() && results.length === 0 && (
        <DropDown>
          <NoResults>No Pokémon found</NoResults>
        </DropDown>
      )}
    </SearchContainer>
  );
}

export default SearchPokemon;
