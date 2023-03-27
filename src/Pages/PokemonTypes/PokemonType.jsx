import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useMemo, useState } from "react";
import { PokemonContext } from "../../components/PokemonContext";
import Loading from "../../components/Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Container = styled.div`
  background-color: lightgray;
  display: grid;
  width: 90%;
  margin: auto;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const Pokemon = styled.div`
  padding: 1em;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  text-align: center;
  text-transform: capitalize;
  letter-spacing: 4px;
  font-size: 32px;
  font-weight: bold;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Name = styled.div`
  text-align: center;
  text-transform: capitalize;
`;

const Sprite = styled(LazyLoadImage)`
  image-rendering: pixelated;
`;

const TypeBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;
const Type = styled.div`
  width: 120px;
`;

const TypeContainer = styled.div`
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0 0.5rem;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: transform 200ms linear;
  }
  font-size: 18px;
`;

const CurrentType = styled.div`
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0 0.5rem;
  border-radius: 10px;
  color: white;
  font-size: 18px;
`;

const TypeIcon = styled.img`
  height: 36px;
  width: 36px;
`;

export default function PokemonType() {
  const { pokeList, loading } = useContext(PokemonContext);
  const navigate = useNavigate();
  const [typeName, setTypeName] = useState("grass");

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
      color: "#ac2922",
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
      color: "#e2d456",
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
      color: "#1b4688",
    },
    psychic: {
      name: "psychic",
      img: "/type-icons/psychic-icon.png",
      color: "#F85888",
    },
  };

  const pokeData = useMemo(() => {
    console.log("filtering..");
    const pokemon = pokeList.filter((item) => {
      return (
        item.types[0].type.name === typeName ||
        (item.types[1] && item.types[1].type.name === typeName)
      );
    });
    return pokemon;
  }, [pokeList, typeName]);

  return (
    <>
      {loading || !pokeData ? (
        <Loading />
      ) : (
        <>
          <TypeBox>
            {Object.values(typeMap).map((item, idx) => {
              return (
                <Type
                  key={item.name}
                  onClick={() => {
                    console.log(item.name);
                    setTypeName(item.name);
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
          </TypeBox>

          <Title>
            <CurrentType
              style={{ backgroundColor: `${typeMap[typeName].color}` }}
            >
              <TypeIcon src={typeMap[typeName].img} />
              <div>{typeName}</div>
            </CurrentType>
          </Title>
          <Container>
            {pokeData
              ? pokeData.map((item) => {
                  return (
                    <Pokemon
                      key={item.id}
                      onClick={() => {
                        navigate(`/pokemon/${item.id}`, {
                          state: { item },
                        });
                      }}
                    >
                      <Name>{item.name}</Name>
                      <Sprite
                        width={140}
                        height={140}
                        src={item.sprites.front_default}
                        placeholderSrc={"/pokeball.svg"}
                      />
                    </Pokemon>
                  );
                })
              : null}
          </Container>
        </>
      )}
    </>
  );
}
