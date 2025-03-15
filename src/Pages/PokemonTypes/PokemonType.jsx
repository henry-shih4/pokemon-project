import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useMemo } from "react";
import { PokemonContext } from "../../components/PokemonContext";
import Loading from "../../components/Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ErrorPage from "../../components/ErrorPage";

const Container = styled.div`
  padding: var(--spacing-xl);
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-lg);
`;

const Pokemon = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--primary);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }


`;

const Title = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: var(--spacing-sm);
  
  span {
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin: var(--spacing-xl);

  h1 {
    color: var(--primary);
    margin-bottom: var(--spacing-md);
  }

  p {
    color: var(--text-secondary);
  }
`;

const Name = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--text-primary);
  text-transform: capitalize;
  margin-bottom: var(--spacing-xs);
`;

const Sprite = styled(LazyLoadImage)`
  width: 150px;
  height: 150px;
  image-rendering: pixelated;
  transition: transform 0.3s ease;

  ${Pokemon}:hover & {
    transform: scale(1.1);
  }
`;

const TypeBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  color: white;
  background-color: ${props => props.color};
  margin: 4px;
  text-transform: capitalize;

  img {
    width: 16px;
    height: 16px;
  }
`;

const Type = styled.div`
 
`;



const TypeContainer = styled.button`
  background: ${props => props.color};
  border: none;
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  text-transform: capitalize;
  box-shadow: var(--shadow-sm);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.color}40;
  }

  ${props => props.selected && `
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    outline: 3px solid white;
  `}

  img {
    width: 24px;
    height: 24px;
  }

  width:120px;
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
  height: 18px;
  width: 18px;
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
    const pokemon = pokeList.filter((item) => {
      return (
        item.types[0].type.name === type ||
        (item.types[1] && item.types[1].type.name === type)
      );
    });
    return pokemon;
  }, [pokeList, type]);

  return (
    <>
      {loading || !pokeData ? (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      ) : (
        <>
        <Header>
          <h1>Filter by Type</h1>
        </Header>
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
                </React.Fragment>
              );
            })}
          </TypeBox>

          {!(type in typeMap) ? (
            <ErrorPage />
          ) : (
            <Container>
                <CurrentType
                  style={{ backgroundColor: `${typeMap[type].color}` }}
                >
                  <TypeIcon src={typeMap[type].img} />
                  <div>{type} </div>
                </CurrentType>
              
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
                      <Title>
                        <Name>{item.name}</Name>
                        <span>#{item.id.toString().padStart(3, '0')}</span>
                      </Title>
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
