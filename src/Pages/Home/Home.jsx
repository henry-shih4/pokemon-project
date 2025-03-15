import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../components/Loading";
import { PokemonContext } from "../../components/PokemonContext";
import Search from '../../components/SearchPokemon';

const Container = styled.div`
  min-height: 100vh;
  padding: var(--spacing-xl) 0;
  background: linear-gradient(135deg, var(--background) 0%, #e0e0e0 100%);
`;

const Hero = styled.section`
  text-align: center;
  padding: var(--spacing-xl) var(--spacing-md);
  margin-bottom: var(--spacing-xl);

  h1 {
    font-size: 3rem;
    color: var(--primary);
    margin-bottom: var(--spacing-md);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  p {
    font-size: 1.2rem;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto var(--spacing-lg);
  }
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  padding: 0 var(--spacing-lg);
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background: var(--surface);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    color: var(--secondary);
    margin-bottom: var(--spacing-md);
  }
`;

const SearchSection = styled.div`
  background: var(--surface);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  max-width: 600px;
  margin: var(--spacing-xl) auto;
  text-align: center;

  h2 {
    color: var(--text-primary);
    margin-bottom: var(--spacing-lg);
  }

  label {
    display: block;
    margin-bottom: var(--spacing-sm);
    color: var(--text-secondary);
  }
`;

const ApiLink = styled(NavLink)`
  color: var(--primary);
  text-decoration: none;
  font-size: 0.9rem;
  &:hover {
    text-decoration: underline;
  }
`;

const LoadingScreen = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  place-content: center;
`;

export default function Home() {
  const { loading } = useContext(PokemonContext);

  if (loading) {
    return (
      <LoadingScreen>
        <Loading />
      </LoadingScreen>
    );
  }

  return (
    <Container>
      <Hero className="fade-in">
        <h1>Welcome to the Pokédex Portal</h1>
        <p>Your ultimate companion for exploring the world of Pokémon. Search, build teams, and discover everything about your favorite Pokémon.</p>
      </Hero>

      <Features className="scale-in">
        <FeatureCard>
          <h3>Pokémon Search</h3>
          <p>Search for any Pokémon by name or Pokédex number to discover detailed information about their stats, abilities, and more.</p>
        </FeatureCard>

        <FeatureCard>
          <h3>Team Builder</h3>
          <p>Create and manage your perfect Pokémon team. Analyze team strengths and weaknesses to build the ultimate combination.</p>
        </FeatureCard>

        <FeatureCard>
          <h3>Type Guide</h3>
          <p>Explore Pokémon types, their relationships, and effectiveness against other types to master battle strategy.</p>
        </FeatureCard>
      </Features>

      <SearchSection className="scale-in">
        <h2>Find Your Pokémon</h2>
        <label htmlFor="search">Enter Pokémon Name or Pokédex Number</label>
        <Search />
        <ApiLink target="_blank" to="https://pokeapi.co/">
          Powered by PokéAPI
        </ApiLink>
      </SearchSection>
    </Container>
  );
}
