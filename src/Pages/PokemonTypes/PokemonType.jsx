import React from "react";
import styled from "styled-components";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { useContext, useMemo, useState, useEffect } from "react";
import { PokemonContext } from "../../components/PokemonContext";
import Loading from "../../components/Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Navigation from "../../components/Navigation";
import ErrorPage from "../../components/ErrorPage";

const Container = styled.div`
  font-family: Roboto;
  background-color: #ffffff;
  display: grid;
  width: 90%;
  min-width: 375px;
  margin: auto;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
  justify-items: center;
`;

const Pokemon = styled.div`
  min-width: 250px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  justify-content: center;
  align-items: center;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  cursor: pointer;
`;

const Title = styled.div`
  text-align: center;
  text-transform: capitalize;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  letter-spacing: 0.1rem;
  div {
    width: 120px;
  }
`;

const Name = styled.div`
  text-align: center;
  text-transform: capitalize;
  padding: 4px;
  text-align: center;
  text-transform: capitalize;
  font-size: 20px;
  span {
    font-weight: bold;
    font-size: 14px;
    padding-left: 8px;
  }
`;

const Sprite = styled(LazyLoadImage)`
  image-rendering: pixelated;
  transition: transform 200ms linear;

  ${Pokemon}:hover & {
    transform: scale(1.1);
    transition: transform 200ms linear;
  }
`;

const TypeBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-transform: capitalize;
  font-family: Roboto;
`;
const Type = styled.div`
  width: 120px;
  letter-spacing: 0.1rem;
  @media (max-width: 600px) {
    display: none;
  }
`;

const TypeSmall = styled.div`
  width: 120px;
  letter-spacing: 0.1rem;
  @media (min-width: 600px) {
    display: none;
  }
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
  height: 24px;
  width: 24px;
`;

const LoadingContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  place-content: center;
`;

export default function PokemonType() {
  const { pokeList, loading } = useContext(PokemonContext);
  const navigate = useNavigate();
  const { type = "grass" } = useParams();
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
        item.types[0].type.name === type ||
        (item.types[1] && item.types[1].type.name === type)
      );
    });
    return pokemon;
  }, [pokeList, type]);

  useEffect(() => {
    console.log(type);
  });
  return (
    <>
      {loading || !pokeData ? (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      ) : (
        <>
          <TypeBox>
            {Object.values(typeMap).map((item, idx) => {
              return (
                <React.Fragment key={item.name + idx}>
                  <Type
                    onClick={() => {
                      navigate(`/types/${item.name}`);
                      sessionStorage.setItem("type", item.name);
                    }}
                  >
                    {typeMap[item.name] ? (
                      <TypeContainer
                        style={{
                          backgroundColor: `${typeMap[item.name].color}`,
                        }}
                      >
                        <TypeIcon src={typeMap[item.name].img} />
                        <div>{item.name}</div>
                      </TypeContainer>
                    ) : null}
                  </Type>
                  <TypeSmall
                    
                    onClick={() => {
                      navigate(`/types/${item.name}`);
                      sessionStorage.setItem("type", item.name);
                    }}
                  >
                    {typeMap[item.name] ? (
                      <TypeContainer
                        style={{
                          backgroundColor: `${typeMap[item.name].color}`,
                        }}
                      >
                        <TypeIcon src={typeMap[item.name].img} />
                      </TypeContainer>
                    ) : null}
                  </TypeSmall>
                </React.Fragment>
              );
            })}
          </TypeBox>

          {!(type in typeMap) ? (
            <ErrorPage />
          ) : (
            <Container>
              <Title>
                <CurrentType
                  style={{ backgroundColor: `${typeMap[type].color}` }}
                >
                  <TypeIcon src={typeMap[type].img} />
                  <div>{type} </div>
                </CurrentType>
              </Title>
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
                        <Name>
                          {item.name} <span>#{item.id}</span>
                        </Name>
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
          )}
        </>
      )}
    </>
  );
}
