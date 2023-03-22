import React from "react";
import { useFetch } from "../../resourcing/useFetch";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background-color: lightgreen;
  display: flex;
  gap: 1rem 0;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
`;

const Type = styled.div`
  padding: 1em;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  text-transform: capitalize;
`;

const TypeContainer = styled.div`
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 12px;
`;

const TypeIcon = styled.img`
  height: 36px;
  width: 36px;
`;

export default function PokemonTypes() {
  const navigate = useNavigate();

  const typeMap = {
    grass: {
      name: "grass",
      img: "/type-icons/grass-icon.png",
      color: "#78C850",
    },
    poison: {
      name: "poison",
      img: "/type-icons/poison-icon.png",
      color: "#A040A0",
    },
    normal: {
      name: "normal",
      img: "/type-icons/normal-icon.png",
      color: "#A8A878",
    },
    fighting: {
      name: "fighting",
      img: "/type-icons/fighting-icon.png",
      color: "#C03028",
    },
    flying: {
      name: "flying",
      img: "/type-icons/flying-icon.png",
      color: "#A990F0",
    },
    ground: {
      name: "ground",
      img: "/type-icons/ground-icon.png",
      color: "#E0C068",
    },
    ghost: {
      name: "ghost",
      img: "/type-icons/ghost-icon.png",
      color: "#705898",
    },
    water: {
      name: "water",
      img: "/type-icons/water-icon.png",
      color: "#6890F0",
    },
    fire: { name: "fire", img: "/type-icons/fire-icon.png", color: "#EF8030" },
    bug: { name: "bug", img: "/type-icons/bug-icon.png", color: "#A8B821" },
    electric: {
      name: "electric",
      img: "/type-icons/electric-icon.png",
      color: "#F8D030",
    },
    rock: { name: "rock", img: "/type-icons/rock-icon.png", color: "#B8A038" },
    steel: {
      name: "steel",
      img: "/type-icons/steel-icon.png",
      color: "#B8B8D0",
    },
    ice: { name: "ice", img: "/type-icons/ice-icon.png", color: "#98D8D8" },
    dark: { name: "dark", img: "/type-icons/dark-icon.png", color: "#705848" },
    fairy: {
      name: "fairy",
      img: "/type-icons/fairy-icon.png",
      color: "#FF65D5",
    },
    dragon: {
      name: "dragon",
      img: "/type-icons/dragon-icon.png",
      color: "#7042F8",
    },
    psychic: {
      name: "psychic",
      img: "/type-icons/psychic-icon.png",
      color: "#F85888",
    },
  };

  return (
    <>
      <h1> pokemon types</h1>
      <Container>
        {Object.values(typeMap).map((item, idx) => {
          return (
            <Type
              key={item.name}
              onClick={() => {
                navigate(`/types/${item.name}`);
              }}
            >
              {typeMap[item.name] ? (
                <TypeContainer
                  style={{ backgroundColor: `${typeMap[item.name].color}` }}
                >
                  <TypeIcon src={typeMap[item.name].img} />
                  <div>{item.name}</div>
                </TypeContainer>
              ) : null}
            </Type>
          );
        })}
      </Container>
    </>
  );
}
