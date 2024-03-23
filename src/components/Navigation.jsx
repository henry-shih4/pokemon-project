import React from 'react'
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SearchPokemon from './SearchPokemon';

const ButtonLink = styled(NavLink)`
  display: inline-block;
  padding: 10px 20px;
  margin: 1em;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  border-radius: 10px;
  color: #3498db;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #b6b6c9;
  }
  
`;

const Links = styled.div`
  display: flex;
  gap: 0 1rem;
  letter-spacing: 4px;
  font-family: "Roboto", sans-serif;

  align-items:center;
  @media (max-width: 600px) {
    display: none;
  }
`;

const Sidebar = styled.div`
  background-color: #3498db;
  position: absolute;
  left: 0;
  height: 100%;
  width: 200px;
  display:none;
  @media (max-width: 600px) {
    display: block;
  }
`;


const MainNav = styled.div`

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;

`;

export default function Navigation() {
  return (
    <MainNav>
      <Sidebar>
        <ButtonLink to="/">Home</ButtonLink>
        <ButtonLink to="/types">Types</ButtonLink>
        <ButtonLink to="/generation">Generations</ButtonLink>
      </Sidebar>
      <Links>
        <ButtonLink to="/">Home</ButtonLink>
        <ButtonLink to="/types">Types</ButtonLink>
        <ButtonLink to="/generation">Generations</ButtonLink>
        <SearchPokemon />
      </Links>
    </MainNav>
  );
}
