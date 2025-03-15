import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Loading from "../../components/Loading";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-xl);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-xl);
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  color: var(--text-primary);
  
  .name {
    font-size: 2.5rem;
    text-transform: capitalize;
  }
  
  .id {
    font-size: 1.8rem;
    color: var(--text-secondary);
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ArtworkSection = styled.div`
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  text-align: center;
`;

const Artwork = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: var(--spacing-md);
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
`;

const Card = styled.div`
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
`;

const CardTitle = styled.h3`
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  
  svg {
    width: 20px;
    height: 20px;
    color: var(--primary);
  }
`;

const TypeBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 1rem;
  color: white;
  background-color: ${props => props.color};
  margin: 0 4px;
  
  img {
    width: 20px;
    height: 20px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
  
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatBar = styled.div`
  height: 8px;
  width: 100%;
  background: var(--background);
  border-radius: 4px;
  overflow: hidden;
  
  div {
    height: 100%;
    background: ${props => {
      // const percentage = (props.value / 255) * 100;
      if (props.value  >= 90) return '#4CAF50';
      if (props.value >= 50) return '#FFC107';
      return '#FF5722';
    }};
    width: ${props => (props.value / 255) * 100}%;
    transition: width 0.3s ease;
  }
`;

const StatGrid = styled.div`
  display: grid;
  gap: var(--spacing-sm);
`;

const StatRow = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr 50px;
  align-items: center;
  gap: var(--spacing-md);
  
  .stat-name {
    text-transform: capitalize;
    color: var(--text-secondary);
  }
  
  .stat-value {
    color: var(--text-primary);
    font-weight: 500;
    text-align: right;
  }
`;

const AbilitySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  
  .ability-name {
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: var(--spacing-xs);
    
    span {
      color: var(--text-secondary);
      font-weight: normal;
      font-style: italic;
    }
  }
  
  .ability-desc {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const Entry = styled.div`
  margin: var(--spacing-lg) 0;
  text-align: center;
  color: var(--text-secondary);
  font-style: italic;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
`;

const Sprites = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-xl);
  text-align: center;
  
  .sprite-title {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-sm);
    font-size: 0.9rem;
  }
  
  img {
    image-rendering: pixelated;
    margin: 0 auto;
  }
`;

export default function PokemonCard(props) {
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
      <Header>
        <Title>
          <span className="name">{name}</span>
          <span className="id">#{id.toString().padStart(3, '0')}</span>
        </Title>
      </Header>

      <MainContent>
        <ArtworkSection>
          <Artwork src={art} alt={name} />
          <Grid>
            <div>
              <h4>Generation</h4>
              <p>{generationMap[generation.split("-")[1]]}</p>
            </div>
            <div>
              <h4>Height</h4>
              <p>{(height / 10).toFixed(1)} m</p>
            </div>
            <div>
              <h4>Weight</h4>
              <p>{(weight / 10).toFixed(1)} kg</p>
            </div>
          </Grid>
        </ArtworkSection>

        <InfoSection>
          <Card>
            <CardTitle>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              Types
            </CardTitle>
            <div style={{ display: 'flex', gap: '8px' }}>
              <TypeBadge color={typeMap[typeOne].color}>
                <img src={typeMap[typeOne].img} alt={typeOne} />
                {typeOne}
              </TypeBadge>
              {typeTwo && (
                <TypeBadge color={typeMap[typeTwo].color}>
                  <img src={typeMap[typeTwo].img} alt={typeTwo} />
                  {typeTwo}
                </TypeBadge>
              )}
            </div>
          </Card>

          <Card>
            <CardTitle>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Base Stats
            </CardTitle>
            <StatGrid>
              {stats.map((stat, idx) => (
                <StatRow key={idx}>
                  <span className="stat-name">{stat.stat.name}</span>
                  <StatBar value={stat.base_stat}>
                    <div />
                  </StatBar>
                  <span className="stat-value">{stat.base_stat}</span>
                </StatRow>
              ))}
              <StatRow style={{ marginTop: '8px', fontWeight: 'bold' }}>
                <span className="stat-name">Total</span>
                <div />
                <span className="stat-value">{totalStat}</span>
              </StatRow>
            </StatGrid>
          </Card>

          <Card>
            <CardTitle>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5.5 5.5A3.5 3.5 0 019 2h6a3.5 3.5 0 013.5 3.5v13a3.5 3.5 0 01-3.5 3.5H9a3.5 3.5 0 01-3.5-3.5v-13z" />
                <path d="M9 2h6a3.5 3.5 0 013.5 3.5v13a3.5 3.5 0 01-3.5 3.5H9a3.5 3.5 0 01-3.5-3.5v-13A3.5 3.5 0 019 2z" />
              </svg>
              Abilities
            </CardTitle>
            {abilityLoading ? (
              <Loading variant="small" />
            ) : (
              <AbilitySection>
                {abilities.map((item, idx) => (
                  <div key={idx}>
                    <h4 className="ability-name">
                      {item.ability.name}
                      {item.is_hidden && <span> (Hidden)</span>}
                    </h4>
                    {abilityText[idx] && (
                      <p className="ability-desc">{abilityText[idx].flavor_text}</p>
                    )}
                  </div>
                ))}
              </AbilitySection>
            )}
          </Card>
        </InfoSection>
      </MainContent>

      <Entry>
        <h3>Pokédex Entry</h3>
        <p>{entry || 'No Pokédex entry available.'}</p>
      </Entry>

      <Sprites>
        <div>
          <p className="sprite-title">Front Sprite</p>
          <img src={img.front_default} alt={`${name} front sprite`} width="120" height="120" />
        </div>
        {img.back_default && (
          <div>
            <p className="sprite-title">Back Sprite</p>
            <img src={img.back_default} alt={`${name} back sprite`} width="120" height="120" />
          </div>
        )}
        <div>
          <p className="sprite-title">Shiny Sprite</p>
          <img src={img.front_shiny} alt={`${name} shiny sprite`} width="120" height="120" />
        </div>
      </Sprites>
    </Container>
  );
}
