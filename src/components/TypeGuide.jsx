import React, { useState } from 'react';
import styled from 'styled-components';
import { getTypeColor } from '../utils/typeCalculations';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-xl);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-xl);

  h1 {
    font-size: 2rem;
    color: var(--primary);
    margin-bottom: var(--spacing-md);
  }

  p {
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
  }
`;

const TypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(144px, 1fr));
  }
`;

const TypeCard = styled.button`
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
`;

const EffectivenessSection = styled.div`
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-lg);

  h2 {
    color: var(--text-primary);
    margin-bottom: var(--spacing-md);
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: 1.2rem;
  }
`;

const TypeBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: 6px 12px;
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
    width:100px;

`;

const TypeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  align-items: center;
`;

const NoTypes = styled.p`
  color: var(--text-secondary);
  font-style: italic;
`;

export default function TypeGuide() {
  const [selectedType, setSelectedType] = useState(null);

  const typeMap = {
    normal: {
      name: "normal",
      img: "/type-icons/normal-icon.png",
      color: "#A8A878",
      weakTo: ['fighting'],
      resistantTo: [],
      immuneTo: ['ghost'],
      superEffectiveAgainst: []
    },
    fighting: {
      name: "fighting",
      img: "/type-icons/fighting-icon.png",
      color: "#C03028",
      weakTo: ['flying', 'psychic', 'fairy'],
      resistantTo: ['rock', 'bug', 'dark'],
      immuneTo: [],
      superEffectiveAgainst: ['normal', 'rock', 'steel', 'ice', 'dark']
    },
    flying: {
      name: "flying",
      img: "/type-icons/flying-icon.png",
      color: "#A890F0",
      weakTo: ['rock', 'electric', 'ice'],
      resistantTo: ['fighting', 'bug', 'grass'],
      immuneTo: ['ground'],
      superEffectiveAgainst: ['fighting', 'bug', 'grass']
    },
    poison: {
      name: "poison",
      img: "/type-icons/poison-icon.png",
      color: "#A040A0",
      weakTo: ['ground', 'psychic'],
      resistantTo: ['fighting', 'poison', 'bug', 'grass', 'fairy'],
      immuneTo: [],
      superEffectiveAgainst: ['grass', 'fairy']
    },
    ground: {
      name: "ground",
      img: "/type-icons/ground-icon.png",
      color: "#E0C068",
      weakTo: ['water', 'grass', 'ice'],
      resistantTo: ['poison', 'rock'],
      immuneTo: ['electric'],
      superEffectiveAgainst: ['poison', 'rock', 'steel', 'fire', 'electric']
    },
    rock: {
      name: "rock",
      img: "/type-icons/rock-icon.png",
      color: "#B8A038",
      weakTo: ['fighting', 'ground', 'steel', 'water', 'grass'],
      resistantTo: ['normal', 'flying', 'poison', 'fire'],
      immuneTo: [],
      superEffectiveAgainst: ['flying', 'bug', 'fire', 'ice']
    },
    bug: {
      name: "bug",
      img: "/type-icons/bug-icon.png",
      color: "#A8B820",
      weakTo: ['flying', 'rock', 'fire'],
      resistantTo: ['fighting', 'ground', 'grass'],
      immuneTo: [],
      superEffectiveAgainst: ['grass', 'psychic', 'dark']
    },
    ghost: {
      name: "ghost",
      img: "/type-icons/ghost-icon.png",
      color: "#705898",
      weakTo: ['ghost', 'dark'],
      resistantTo: ['poison', 'bug'],
      immuneTo: ['normal', 'fighting'],
      superEffectiveAgainst: ['ghost', 'psychic']
    },
    steel: {
      name: "steel",
      img: "/type-icons/steel-icon.png",
      color: "#B8B8D0",
      weakTo: ['fighting', 'ground', 'fire'],
      resistantTo: ['normal', 'flying', 'rock', 'bug', 'steel', 'grass', 'psychic', 'ice', 'dragon', 'fairy'],
      immuneTo: ['poison'],
      superEffectiveAgainst: ['rock', 'ice', 'fairy']
    },
    fire: {
      name: "fire",
      img: "/type-icons/fire-icon.png",
      color: "#F08030",
      weakTo: ['ground', 'rock', 'water'],
      resistantTo: ['bug', 'steel', 'fire', 'grass', 'ice', 'fairy'],
      immuneTo: [],
      superEffectiveAgainst: ['bug', 'steel', 'grass', 'ice']
    },
    water: {
      name: "water",
      img: "/type-icons/water-icon.png",
      color: "#6890F0",
      weakTo: ['grass', 'electric'],
      resistantTo: ['steel', 'fire', 'water', 'ice'],
      immuneTo: [],
      superEffectiveAgainst: ['ground', 'rock', 'fire']
    },
    grass: {
      name: "grass",
      img: "/type-icons/grass-icon.png",
      color: "#78C850",
      weakTo: ['flying', 'poison', 'bug', 'fire', 'ice'],
      resistantTo: ['ground', 'water', 'grass', 'electric'],
      immuneTo: [],
      superEffectiveAgainst: ['ground', 'rock', 'water']
    },
    electric: {
      name: "electric",
      img: "/type-icons/electric-icon.png",
      color: "#F8D030",
      weakTo: ['ground'],
      resistantTo: ['flying', 'steel', 'electric'],
      immuneTo: [],
      superEffectiveAgainst: ['flying', 'water']
    },
    psychic: {
      name: "psychic",
      img: "/type-icons/psychic-icon.png",
      color: "#F85888",
      weakTo: ['bug', 'ghost', 'dark'],
      resistantTo: ['fighting', 'psychic'],
      immuneTo: [],
      superEffectiveAgainst: ['fighting', 'poison']
    },
    ice: {
      name: "ice",
      img: "/type-icons/ice-icon.png",
      color: "#98D8D8",
      weakTo: ['fighting', 'rock', 'steel', 'fire'],
      resistantTo: ['ice'],
      immuneTo: [],
      superEffectiveAgainst: ['flying', 'ground', 'grass', 'dragon']
    },
    dragon: {
      name: "dragon",
      img: "/type-icons/dragon-icon.png",
      color: "#7038F8",
      weakTo: ['ice', 'dragon', 'fairy'],
      resistantTo: ['fire', 'water', 'grass', 'electric'],
      immuneTo: [],
      superEffectiveAgainst: ['dragon']
    },
    dark: {
      name: "dark",
      img: "/type-icons/dark-icon.png",
      color: "#705848",
      weakTo: ['fighting', 'bug', 'fairy'],
      resistantTo: ['ghost', 'dark'],
      immuneTo: ['psychic'],
      superEffectiveAgainst: ['ghost', 'psychic']
    },
    fairy: {
      name: "fairy",
      img: "/type-icons/fairy-icon.png",
      color: "#EE99AC",
      weakTo: ['poison', 'steel'],
      resistantTo: ['fighting', 'bug', 'dark'],
      immuneTo: ['dragon'],
      superEffectiveAgainst: ['fighting', 'dragon', 'dark']
    }
  };

  return (
    <Container>
      <Header>
        <h1>Pokémon Type Guide</h1>
        <p>Select a type to see its strengths, weaknesses, and relationships with other types.</p>
      </Header>

      <TypeGrid>
        {Object.values(typeMap).map(type => (
          <TypeCard
            key={type.name}
            color={type.color}
            selected={selectedType?.name === type.name}
            onClick={() => setSelectedType(type)}
          >
            <img src={type.img} alt={type.name} />
            {type.name}
          </TypeCard>
        ))}
      </TypeGrid>

      {selectedType && (
        <>
          <EffectivenessSection>
            <h2>
              <img src={selectedType.img} alt={selectedType.name} width="24" height="24" />
              Super Effective Against
            </h2>
            <TypeList>
              {selectedType.superEffectiveAgainst.length > 0 ? (
                selectedType.superEffectiveAgainst.map(typeName => (
                  <TypeBadge key={typeName} color={typeMap[typeName].color}>
                    <img src={typeMap[typeName].img} alt={typeName} />
                    {typeName}
                  </TypeBadge>
                ))
              ) : (
                <NoTypes>No types</NoTypes>
              )}
            </TypeList>
          </EffectivenessSection>

          <EffectivenessSection>
            <h2>
              <img src={selectedType.img} alt={selectedType.name} width="24" height="24" />
              Weak To
            </h2>
            <TypeList>
              {selectedType.weakTo.map(typeName => (
                <TypeBadge key={typeName} color={typeMap[typeName].color}>
                  <img src={typeMap[typeName].img} alt={typeName} />
                  {typeName}
                </TypeBadge>
              ))}
            </TypeList>
          </EffectivenessSection>

          <EffectivenessSection>
            <h2>
              <img src={selectedType.img} alt={selectedType.name} width="24" height="24" />
              Resistant To
            </h2>
            <TypeList>
              {selectedType.resistantTo.length > 0 ? (
                selectedType.resistantTo.map(typeName => (
                  <TypeBadge key={typeName} color={typeMap[typeName].color}>
                    <img src={typeMap[typeName].img} alt={typeName} />
                    {typeName}
                  </TypeBadge>
                ))
              ) : (
                <NoTypes>No resistances</NoTypes>
              )}
            </TypeList>
          </EffectivenessSection>

          <EffectivenessSection>
            <h2>
              <img src={selectedType.img} alt={selectedType.name} width="24" height="24" />
              Immune To
            </h2>
            <TypeList>
              {selectedType.immuneTo.length > 0 ? (
                selectedType.immuneTo.map(typeName => (
                  <TypeBadge key={typeName} color={typeMap[typeName].color}>
                    <img src={typeMap[typeName].img} alt={typeName} />
                    {typeName}
                  </TypeBadge>
                ))
              ) : (
                <NoTypes>No immunities</NoTypes>
              )}
            </TypeList>
          </EffectivenessSection>
        </>
      )}
    </Container>
  );
} 