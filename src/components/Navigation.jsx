import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SearchPokemon from "./SearchPokemon";
import { keyframes } from "styled-components";

const ButtonLink = styled(NavLink)`
  display: inline-block;
  padding: 10px 20px;
  margin: 0.5em;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  border-radius: var(--radius-md);
  color: var(--text-primary);
  background-color: var(--surface);
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);

  &:hover {
    background-color: var(--background);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  &.active {
    color: white;
    background-color: var(--primary);
  }
`;

const Header = styled.div`
  display: flex;
  gap: 0 1rem;
  align-items: center;
  padding: 0.5rem var(--spacing-md);
  background-color: var(--surface);
  box-shadow: var(--shadow-md);

  @media (max-width: 700px) {
    display: none;
  }
`;

const Sidebar = styled.div`
  flex-direction: column;
  background-color: var(--surface);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
  z-index: 1000;
  box-shadow: var(--shadow-lg);
  display: none;
  
  @media (max-width: 700px) {
    display: flex;
    animation-duration: 0.3s;
    animation-name: ${(props) => (props.sideBarOpen ? slideIn : slideOut)};
    animation-fill-mode: forwards;
  }
`;

const MainNav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--surface);
`;

const Search = styled.div`
  margin-left: 10rem;
  width: 100%;
  @media (max-width: 900px) {
    display: none;
  }
`;

const Link = styled(NavLink)`
  font-weight: 600;
  color: var(--text-primary);
  padding: var(--spacing-md);
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;

  &:hover {
    background-color: var(--background);
  }

  &.active {
    color: var(--primary);
    background-color: var(--background);
  }

  svg {
    margin-right: var(--spacing-sm);
    width: 20px;
    height: 20px;
  }
`;

const Links = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
`;

const NavButtonFloat = styled.button`
  position: fixed;
  top: var(--spacing-md);
  left: var(--spacing-md);
  z-index: 1001;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-xs);
  border-radius: 50%;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  @media (min-width: 600px) {
    display: none;
  }
`;

const NavIcon = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation-duration: 0.2s;
  animation-name: ${(props) => (props.sideBarOpen ? rotate : counterRotate)};
  animation-fill-mode: forwards;
`;

const Icon = styled.img`
  height: 24px;
  width: 24px;
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(90deg); }
`;

const counterRotate = keyframes`
  from { transform: rotate(90deg); }
  to { transform: rotate(0deg); }
`;

const slideIn = keyframes`
  from { transform: translateX(-100%) }
  to { transform: translateX(0%) }
`;

const slideOut = keyframes`
  from { transform: translateX(0%) }
  to { transform: translateX(-100%) }
`;

export default function Navigation() {
  var gen = '1';
  var type = 'grass';
  if (sessionStorage.getItem("generation")) {
    gen = sessionStorage.getItem("generation");
  }
  
  if (sessionStorage.getItem("type")) {
    type = sessionStorage.getItem("type");
  }

  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <MainNav>
      <Sidebar sideBarOpen={sideBarOpen}>
        <Links>
          <Link onClick={() => setSideBarOpen(!sideBarOpen)} to="/">Home</Link>
          <Link onClick={() => setSideBarOpen(!sideBarOpen)} to={"/types/" + type}>Types</Link>
          <Link onClick={() => setSideBarOpen(!sideBarOpen)} to="/type-guide">Type Guide</Link>
          <Link onClick={() => setSideBarOpen(!sideBarOpen)} to={"/generation/" + gen}>Generations</Link>
          <Link onClick={() => setSideBarOpen(!sideBarOpen)} to="/teams">Team Builder</Link>
        </Links>
      </Sidebar>

      <NavButtonFloat onClick={() => setSideBarOpen(!sideBarOpen)}>
        <NavIcon sideBarOpen={sideBarOpen}>
          <Icon src="/open.svg" alt="menu" />
        </NavIcon>
      </NavButtonFloat>

      <Header>
        <ButtonLink to="/">Home</ButtonLink>
        <ButtonLink to={"/types/" + type}>Types</ButtonLink>
        <ButtonLink to="/type-guide">Type Guide</ButtonLink>
        <ButtonLink to={"/generation/" + gen}>Generations</ButtonLink>
        <ButtonLink to="/teams">Team Builder</ButtonLink>
      </Header>
    </MainNav>
  );
}
