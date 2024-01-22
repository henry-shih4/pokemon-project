import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
  width: 100%;
  
`;

const Info = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin: 1rem;
  
`;


const Sprite = styled.img`
  height: 200px;
  width: 200px;

  image-rendering: pixelated;
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
`;

const StatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 50%;
`;

const StatName = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items:left;
  width: 140px;
  text-transform:capitalize;
`;

const Bar = styled.div`
  width: 240px;
  height: 10px;
  display: flex;
  border-radius: 10px;
  background-color: lightgray;
`;

const TypeIcon = styled.img`
  height: 24px;
  width: 24px;
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
  width: 100px;
  text-transform:capitalize;
`;

const CategoryTitle = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
`;

const Category = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-transform: capitalize;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: start;
  align-items: start;
  gap: 1rem;
`;

const Box = styled.div`
  display: flex;
  justify-items:center;
  flex-direction: column;
  gap: 2rem;
  width:50%;
  align-items:center;
`;
const MainSection = styled.div`
  display: flex;
  justify-items: center;
  gap: 2rem;
`;

const Entry = styled.div`
  padding:10px;
  display:flex;
  flex-direction:column;
  gap: 10px;
  text-align:center;
  font-size:18px;
  font-weight:bold;
`

const TotalStat = styled.div`
display:flex;
width:100%;
justify-content:center;
font-weight:bold;
gap:14px;
`

export default function Card(props) {
  const { name, img, id, stats, types, abilities, description, generation } =
    props;
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

  useEffect(()=>{
    const total = stats.reduce(function (acc, obj) {
      return acc + obj['base_stat'];
    }, 0);
    setTotalStat(total);
  },[stats])


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
      } else if (generation == 'generation-ix'){
        setEntry(description[0].flavor_text)
      }
      else {
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
        <Sprite src={img} />
        <Box>
          <MainSection>
            <Section>
              <CategoryTitle>Type</CategoryTitle>
              <Category>
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
              </Category>
            </Section>
            <Section>
              <CategoryTitle>Abilities</CategoryTitle>
              <Category>
                {abilities
                  ? abilities.map((item) => {
                      return (
                        <div key={item.ability.name}>
                          {item.ability.name}
                          {item.is_hidden == true ? <> (hidden) </> : null}
                        </div>
                      );
                    })
                  : null}
              </Category>
            </Section>
          </MainSection>
          <Entry>
            <div>{entry}</div>
            <div>Gen {generation.split("-")[1].toUpperCase()}</div>
          </Entry>
        </Box>
      </Info>
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
                          width: `${stat.base_stat * 1.8}px`,
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
    </Container>
  );
}
