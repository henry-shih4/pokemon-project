import React from "react";
import {useState} from "react"
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SearchPokemon from "./SearchPokemon";
import { keyframes } from "styled-components";


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
  `

const Header = styled.div`
  display: flex;
  gap: 0 1rem;
  letter-spacing: 4px;
  font-family: "Roboto", sans-serif;

  align-items: center;
  @media (max-width: 600px) {
    display: none;
  }
`;

const Sidebar = styled.div`
  flex-direction: column;

  background-color: #3498db;
  position: absolute;
  top: 0%;
  height: 50vh;
  width: 200px;
  display: none;
  
  @media (max-width: 600px) {
    display: flex;
    
    animation-duration: 1s;
    animation-name: ${(props) => (props.sideBarOpen ? slideIn : slideOut)};
    animation-fill-mode: forwards;
  }
`;

const MainNav = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Roboto", sans-serif;
  @media (max-width: 600px) {
    position: fixed;
    top: 0%;
  }
`;

const Search = styled.div`
  @media (max-width: 900px) {
    display: none;
  }
`;

const Link = styled(NavLink)`
  font-weight: bold;
  color: white;
  letter-spacing: 4px;
  height:60px;
  display:flex;
  justify-content:center;
  align-items:center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #b6b6c9;
  }
`;

const Links = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;

`;


const NavButtonFloat = styled.div`
  position:absolute;
  @media (min-width: 600px) {
    display: none;
  }
`;

const NavIcon = styled.div`
  height: 40px;
  width: 40px;
  margin: 14px;
  animation-duration: 0.2s;
  animation-name: ${(props) => (props.sideBarOpen ? rotate : counterRotate)};
  animation-fill-mode: forwards;
`;

const Icon = styled.img`
  height: 40px;
  width: 40px;
`;


const rotate = keyframes`
  from {
    transform: rotate(0deg);

  }

  to {
    transform: rotate(90deg);

  }
`;

const counterRotate = keyframes`
  from {
    transform: rotate(90deg);

  }

  to {
    transform: rotate(0deg);

  }
`;

const slideIn = keyframes`
from{
  transform:translateX(-100%)
} 
to {
  transform:translateX(0%)
}`;

const slideOut = keyframes`
from{
  transform:translateX(0%)
} 
to {
  transform:translateX(-100%)
}`;


export default function Navigation() {
  var gen = '1';
  var type = 'grass';
  if (sessionStorage.getItem("generation")){
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
          <Link to="/">Home</Link>
          <Link to={"/types/" + type}>Types</Link>
          <Link to={"generation/" + gen}>Generations</Link>
        </Links>
      </Sidebar>

      <NavButtonFloat>
        <NavIcon
          sideBarOpen={sideBarOpen}
          onClick={() => {
            setSideBarOpen((setSideBarOpen) => !sideBarOpen);
          }}
        >
          <Icon src="/open.svg"></Icon>
        </NavIcon>
      </NavButtonFloat>
      <Header>
        <ButtonLink to="/">Home</ButtonLink>
        <ButtonLink to={"/types/" + type}>Types</ButtonLink>
        <ButtonLink to={"generation/" + gen}>Generations</ButtonLink>
        <Search>
          <SearchPokemon />
        </Search>
      </Header>
    </MainNav>
  );
}
