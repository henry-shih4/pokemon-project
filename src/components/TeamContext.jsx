import React, { createContext, useState, useContext, useEffect } from 'react';

export const TeamContext = createContext();

export function TeamProvider({ children }) {
  const [teams, setTeams] = useState(() => {
    const savedTeams = localStorage.getItem('pokemon-teams');
    return savedTeams ? JSON.parse(savedTeams) : [];
  });

  useEffect(() => {
    localStorage.setItem('pokemon-teams', JSON.stringify(teams));
  }, [teams]);

  const addTeam = (teamName) => {
    setTeams([...teams, { id: Date.now(), name: teamName, pokemon: [] }]);
  };

  const deleteTeam = (teamId) => {
    setTeams(teams.filter(team => team.id !== teamId));
  };

  const addPokemonToTeam = (teamId, pokemon) => {
    setTeams(teams.map(team => {
      if (team.id === teamId && team.pokemon.length < 6) {
        return {
          ...team,
          pokemon: [...team.pokemon, { ...pokemon, teamPosition: team.pokemon.length }]
        };
      }
      return team;
    }));
  };

  const removePokemonFromTeam = (teamId, pokemonIndex) => {
    setTeams(teams.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          pokemon: team.pokemon.filter((_, index) => index !== pokemonIndex)
        };
      }
      return team;
    }));
  };

  const reorderTeam = (teamId, startIndex, endIndex) => {
    setTeams(teams.map(team => {
      if (team.id === teamId) {
        const newPokemon = Array.from(team.pokemon);
        const [removed] = newPokemon.splice(startIndex, 1);
        newPokemon.splice(endIndex, 0, removed);
        return { ...team, pokemon: newPokemon };
      }
      return team;
    }));
  };

  return (
    <TeamContext.Provider value={{
      teams,
      addTeam,
      deleteTeam,
      addPokemonToTeam,
      removePokemonFromTeam,
      reorderTeam
    }}>
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
} 