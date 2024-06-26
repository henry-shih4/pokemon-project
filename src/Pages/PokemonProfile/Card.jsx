import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Loading from "../../components/Loading";

const Container = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  width: 80%;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin: 1rem;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const Vitals = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;

  h3 {
    font-weight: bold;
    margin: 2px;
  }

  @media (max-width: 900px) {
    flex-direction: row;
    gap: 14px;
  }
`;

const Sprites = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top:24px;
  p {
    text-align: center;
    margin:0;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 0;
  }
`;
const Sprite = styled.img`
  height: 140px;
  width: 140px;
  image-rendering: pixelated;
`;

const Artwork = styled.img`
  max-width: 350px;
  @media (max-width: 580px) {
    max-width: 200px;
  }
`;

const Title = styled.h1`
  display: flex;
  gap: 1rem;
  text-align: center;
  text-transform: capitalize;
`;

const Stats = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding-left: 10px;
  padding-right: 10px;
`;

const StatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 50%;
  max-width: 350px;
  padding-left: 10px;
  padding-right: 10px;
`;

const StatName = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: left;
  width: 140px;
  text-transform: capitalize;
`;

const Bar = styled.div`
  width: 240px;
  height: 10px;
  display: flex;
  border-radius: 10px;
  background-color: lightgray;

  @media (max-width: 425px) {
    display: none;
  }
`;

const TypeIcon = styled.img`
  height: 24px;
  width: 24px;
`;

const TypeBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 900px) {
    flex-direction: row;
  }
`;
const Type = styled.div`
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0 0.5rem;
  border-radius: 10px;
  color: white;
  font-size: 18px;
  width: 110px;
  text-transform: capitalize;
`;

const CategoryTitle = styled.div`
  text-transform: capitalize;
  display: flex;
  justify-content: start;
  h3 {
    width: full;
    margin: 4px;
  }
`;

const AbilityBox = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: start;
  div {
    padding: 4px;
  }
  padding-right: 10px;
  min-width: 350px;
`;
const AbilityName = styled.div`
  gap: 10px;
  h4 {
    text-transform: capitalize;
    margin: 4px;
    text-decoration: underline;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  gap: 1rem;
`;

const Box = styled.div`
  display: flex;
  justify-items: center;
  flex-direction: column;
  gap: 1rem;
  width: 50%;
  align-items: center;
`;
const MainSection = styled.div`
  display: flex;
  justify-items: center;
  align-items: start;
  gap: 2rem;
  @media (max-width: 1180px) {
    flex-direction: column;
  }
`;

const Entry = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  width: 45%;
  max-width:480px;
  margin-bottom:2rem;
  h3 {
    text-transform: capitalize;
    margin: 4px;
  }
  @media (max-width: 900px) {
    width: 75%;
  }
`;

const TotalStat = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  font-weight: bold;
  gap: 14px;
`;

const LoadingScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Card(props) {
  const {
    name,
    img,
    art,
    id,
    stats,
    types,
    abilities,
    description,
    generation,
    abilityText,
    height,
    weight,
    abilityLoading,
    errorPage
  } = props;
  const [entry, setEntry] = useState("");
  const [totalStat, setTotalStat] = useState(0);
  const typeOne = types[0].type.name;
  let typeTwo = null;
  if (types[1]) {
    typeTwo = types[1].type.name;
  }

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

  const generationMap = {
    i: 1,
    ii: 2,
    iii: 3,
    iv: 4,
    v: 5,
    vi: 6,
    Vvii: 7,
    viii: 8,
    ix: 9,
  };

  // calculate total stat of pokemon
  useEffect(() => {
    const total = stats.reduce(function (acc, obj) {
      return acc + obj["base_stat"];
    }, 0);
    setTotalStat(total);
  }, [stats]);

  useEffect(() => {
    if (description.length > 0) {
      if (generation === "generation-v") {
        setEntry(description[1].flavor_text);
      } else if (generation === "generation-vi") {
        setEntry(description[14].flavor_text);
      } else if (
        generation === "generation-vii" ||
        generation === "generation-viii"
      ) {
        if (description.length <= 1) {
          setEntry(description[0].flavor_text);
        } else {
          setEntry(description[17].flavor_text);
        }
      } else if (generation == "generation-ix") {
        setEntry(description[0].flavor_text);
      } else {
        setEntry(description[8].flavor_text);
      }
    }
  }, [generation, description]);


  return (
    <Container>
      <Title>
        <div>{name}</div>
        <div>#{id}</div>
      </Title>
      <Info>
        <Artwork src={art} />
        <div>
          <Vitals>
            <div>
              <h3>Generation</h3>
              <p>{generationMap[generation.split("-")[1]]}</p>
            </div>
            <div>
              <h3>Height</h3>
              <p>
                {height.length >= 3
                  ? height.slice(0, 2) + "." + height.slice(-1)
                  : height.length == 2
                  ? height.slice(0, 1) + "." + height.slice(-1)
                  : height / 10}{" "}
                m
              </p>
            </div>
            <div>
              <h3>Weight</h3>
              <p>{weight / 10} kg</p>
            </div>
          </Vitals>
        </div>

        <Box>
          <MainSection>
            <Section>
              <TypeBox>
                <CategoryTitle>
                  <h3>Type</h3>
                </CategoryTitle>
                <Type style={{ backgroundColor: `${typeMap[typeOne].color}` }}>
                  <TypeIcon src={typeMap[typeOne].img} />
                  {types[0].type.name}
                </Type>
                {typeTwo ? (
                  <Type
                    style={{ backgroundColor: `${typeMap[typeTwo].color}` }}
                  >
                    <TypeIcon src={typeMap[typeTwo].img} />
                    {types[1].type.name}
                  </Type>
                ) : null}
              </TypeBox>
            </Section>
            <Section>
              {abilityLoading ? (
                <LoadingScreen>
                  <Loading variant="small" />
                </LoadingScreen> 
             ) : (
                <AbilityBox>
                  <CategoryTitle>
                    <h3>Abilities</h3>
                  </CategoryTitle>
                  <AbilityName>
                    {abilities
                      ? abilities.map((item, idx) => {
                          return (
                            <div key={idx}>
                              <h4>
                                {item.ability.name}{" "}
                                {item.is_hidden == true ? (
                                  <> (hidden) </>
                                ) : null}
                              </h4>

                              {abilityText[idx] ? (
                                <div>{abilityText[idx].flavor_text}</div>
                              ) : null}
                            </div>
                          );
                        })
                      : null}
                  </AbilityName>
                </AbilityBox>
              )}
            </Section>
          </MainSection>
        </Box>
      </Info>
      <Entry>
        <h3>Pokedex Entry</h3>
        <div>{entry?entry:'N/A'}</div>
      </Entry>
      <StatContainer>
        {stats
          ? stats.map((stat, idx) => {
              return (
                <React.Fragment key={idx}>
                  <Stats>
                    <StatName>
                      <div>{stat.stat.name} </div>
                    </StatName>

                    <Bar>
                      <div
                        style={{
                          backgroundColor: "blue",
                          width: `${stat.base_stat * 1.5}px`,
                          borderRadius: "10px",
                        }}
                      ></div>
                    </Bar>
                    <div>{stat.base_stat}</div>
                  </Stats>
                </React.Fragment>
              );
            })
          : null}
        <TotalStat>
          <p>Total Stat:</p> <p>{totalStat}</p>
        </TotalStat>
      </StatContainer>
      <Sprites>
        <div>
          <p>Front Sprite</p>
          <Sprite src={img.front_default} />
        </div>

        {img.back_default ? (
          <div>
            <p>Back Sprite</p>
            <Sprite src={img.back_default} />
          </div>
        ) : null}
        <div>
          <p>Shiny</p>
          <Sprite src={img.front_shiny} />
        </div>
      </Sprites>
    </Container>
  );
}
