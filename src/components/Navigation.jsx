import React from 'react'
import { NavLink } from "react-router-dom";
import styled from "styled-components";

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
`;

const MainNav = styled.div`
  background-color: #3498db;
  padding: 20px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

export default function Navigation() {
  return (
    <MainNav>
      <Links>
        <ButtonLink to="/">Home</ButtonLink>
        <ButtonLink to="/types">Types</ButtonLink>
        <ButtonLink to="/generation">Generations</ButtonLink>
      </Links>
    </MainNav>
  );
}
