import React, { useState } from 'react';
import styled from 'styled-components';
import { useTeam } from '../../components/TeamContext';
import SearchPokemon from '../../components/SearchPokemon';
import TeamAnalysis from '../../components/TeamAnalysis';

const Container = styled.div`
  padding: var(--spacing-xl);
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-xl);

  h1 {
    color: var(--primary);
    margin-bottom: var(--spacing-md);
  }

  p {
    color: var(--text-secondary);
  }
`;

const TeamsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
`;

const TeamCard = styled.div`
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    color: var(--secondary);
    margin-bottom: var(--spacing-md);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const TeamCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

const AnalysisToggle = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;

  &:hover {
    background: var(--background);
    color: var(--text-primary);
  }

  svg {
    transition: transform 0.2s ease;
    transform: rotate(${props => props.isOpen ? '180deg' : '0deg'});
  }
`;

const PokemonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
`;

const PokemonSlot = styled.div`
  position: relative;
  background: ${props => props.empty ? '#f5f5f5' : 'var(--background)'};
  border-radius: var(--radius-md);
  padding: var(--spacing-sm);
  text-align: center;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.empty ? 'pointer' : 'default'};

  img {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }

  p {
    margin-top: var(--spacing-xs);
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
`;

const Button = styled.button`
  background: var(--primary);
  color: white;
  border: none;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s ease;

  &:hover {
    background: #e64d4a;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ff4444;
  cursor: pointer;
  font-size: 1.2rem;
  padding: var(--spacing-xs);

  &:hover {
    color: #cc0000;
  }
`;

const AddTeamForm = styled.form`
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);

  input {
    flex: 1;
    padding: var(--spacing-sm);
    border: 2px solid #ddd;
    border-radius: var(--radius-md);
    font-size: 1rem;

    &:focus {
      border-color: var(--primary);
      outline: none;
    }
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: var(--surface);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  width: 90%;
  max-width: 500px;
  position: relative;

  h2 {
    color: var(--text-primary);
    margin-bottom: var(--spacing-lg);
    text-align: center;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-secondary);
  cursor: pointer;
  padding: var(--spacing-xs);
  
  &:hover {
    color: var(--text-primary);
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: var(--spacing-xs);
  right: var(--spacing-xs);
  background: rgba(255, 68, 68, 0.1);
  border: none;
  color: #ff4444;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
  line-height: 1;

  &:hover {
    background: rgba(255, 68, 68, 0.2);
  }
`;

export default function TeamBuilder() {
  const { teams, addTeam, deleteTeam, addPokemonToTeam, removePokemonFromTeam } = useTeam();
  const [newTeamName, setNewTeamName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [openAnalysis, setOpenAnalysis] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTeamName.trim()) {
      addTeam(newTeamName.trim());
      setNewTeamName('');
    }
  };

  const handlePokemonClick = (team, slotIndex) => {
    setSelectedTeam(team.id);
    setSelectedSlot(slotIndex);
    setIsModalOpen(true);
  };

  const handleAddPokemon = (pokemon) => {
    if (selectedTeam && typeof selectedSlot === 'number') {
      addPokemonToTeam(selectedTeam, pokemon);
      setIsModalOpen(false);
    }
  };

  const toggleAnalysis = (teamId) => {
    setOpenAnalysis(prev => ({
      ...prev,
      [teamId]: !prev[teamId]
    }));
  };

  return (
    <Container className="fade-in">
      <Header>
        <h1>Pokémon Team Builder</h1>
        <p>Create and manage your perfect Pokémon teams. Each team can have up to 6 Pokémon.</p>
      </Header>

      <AddTeamForm onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTeamName}
          onChange={(e) => setNewTeamName(e.target.value)}
          placeholder="Enter new team name"
          maxLength={30}
        />
        <Button type="submit" disabled={!newTeamName.trim()}>
          Create Team
        </Button>
      </AddTeamForm>

      <TeamsList>
        {teams.map(team => (
          <TeamCard key={team.id} className="scale-in">
            <TeamCardContent>
              <h3>
                {team.name}
                <DeleteButton onClick={() => deleteTeam(team.id)}>×</DeleteButton>
              </h3>
              <PokemonGrid>
                {[...Array(6)].map((_, index) => {
                  const pokemon = team.pokemon[index];
                  return (
                    <PokemonSlot 
                      key={index} 
                      empty={!pokemon}
                      onClick={() => !pokemon && handlePokemonClick(team, index)}
                    >
                      {pokemon ? (
                        <>
                          <RemoveButton 
                            onClick={(e) => {
                              e.stopPropagation();
                              removePokemonFromTeam(team.id, index);
                            }}
                          >
                            ×
                          </RemoveButton>
                          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                          <p>{pokemon.name}</p>
                        </>
                      ) : (
                        <p>Add Pokémon</p>
                      )}
                    </PokemonSlot>
                  );
                })}
              </PokemonGrid>
              
              {team.pokemon.length > 0 && (
                <>
                  <AnalysisToggle 
                    onClick={() => toggleAnalysis(team.id)}
                    isOpen={openAnalysis[team.id]}
                  >
                    {openAnalysis[team.id] ? 'Hide Analysis' : 'Show Analysis'}
                    <svg width="12" height="12" viewBox="0 0 12 12">
                      <path
                        d="M6 8L2 4h8L6 8z"
                        fill="currentColor"
                      />
                    </svg>
                  </AnalysisToggle>
                  
                  {openAnalysis[team.id] && (
                    <TeamAnalysis team={team.pokemon} />
                  )}
                </>
              )}
            </TeamCardContent>
          </TeamCard>
        ))}
      </TeamsList>

      {isModalOpen && (
        <Modal onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={() => setIsModalOpen(false)}>×</CloseButton>
            <h2>Add Pokémon to Team</h2>
            <SearchPokemon onSelect={handleAddPokemon} />
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
} 