import React from 'react';
import styled from 'styled-components';
import { analyzeTeamTypes, getTypeColor } from '../utils/typeCalculations';

const AnalysisContainer = styled.div`
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-top: var(--spacing-md);
`;

const TypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
`;

const TypeBadge = styled.div`
  background-color: ${props => props.color};
  color: white;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  text-align: center;
  font-size: 0.9rem;
  text-transform: capitalize;
  position: relative;
  
  &::after {
    content: '${props => props.count > 0 ? `×${props.count}` : ''}';
    position: absolute;
    top: -8px;
    right: -8px;
    background: var(--surface);
    color: var(--text-primary);
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    box-shadow: var(--shadow-sm);
  }
`;

const Section = styled.div`
  margin-bottom: var(--spacing-lg);

  h3 {
    color: var(--text-primary);
    margin-bottom: var(--spacing-sm);
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .icon {
    width: 24px;
    height: 24px;
  }
`;

const Alert = styled.div`
  background-color: ${props => props.level === 'warning' ? '#fff3cd' : '#f8d7da'};
  color: ${props => props.level === 'warning' ? '#856404' : '#721c24'};
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-md);
  font-size: 0.9rem;
`;

function TeamAnalysis({ team }) {
  const analysis = analyzeTeamTypes(team);
  
  // Find critical weaknesses (3 or more Pokemon weak to the same type)
  const criticalWeaknesses = Object.entries(analysis.weaknesses)
    .filter(([_, count]) => count >= 3)
    .map(([type]) => type);

  // Find types with no coverage
  const uncoveredTypes = Object.entries(analysis.coverage)
    .filter(([_, count]) => count === 0)
    .map(([type]) => type);

  return (
    <AnalysisContainer>
      {criticalWeaknesses.length > 0 && (
        <Alert level="danger">
          ⚠️ Critical Weakness: {criticalWeaknesses.length} of your Pokémon are weak to{' '}
          {criticalWeaknesses.map((type, i) => (
            <span key={type}>
              {i > 0 && i === criticalWeaknesses.length - 1 ? ' and ' : i > 0 ? ', ' : ''}
              {type}
            </span>
          ))} type moves.
        </Alert>
      )}

      {uncoveredTypes.length > 0 && (
        <Alert level="warning">
          ℹ️ Your team lacks coverage against{' '}
          {uncoveredTypes.map((type, i) => (
            <span key={type}>
              {i > 0 && i === uncoveredTypes.length - 1 ? ' and ' : i > 0 ? ', ' : ''}
              {type}
            </span>
          ))} type Pokémon.
        </Alert>
      )}

      <Section>
        <h3>
          <span role="img" aria-label="sword" className="icon">⚔️</span>
          Offensive Coverage
        </h3>
        <TypeGrid>
          {Object.entries(analysis.coverage)
            .sort((a, b) => b[1] - a[1])
            .map(([type, count]) => (
              <TypeBadge key={type} color={getTypeColor(type)} count={count}>
                {type}
              </TypeBadge>
            ))}
        </TypeGrid>
      </Section>

      <Section>
        <h3>
          <span role="img" aria-label="brick" className="icon">🧱</span>
          Defensive Analysis
        </h3>
        <TypeGrid>
          {Object.entries(analysis.weaknesses)
            .filter(([_, count]) => count > 0)
            .sort((a, b) => b[1] - a[1])
            .map(([type, count]) => (
              <TypeBadge key={type} color={getTypeColor(type)} count={count}>
                {type}
              </TypeBadge>
            ))}
        </TypeGrid>
      </Section>

      <Section>
        <h3>
          <span role="img" aria-label="shield" className="icon">🛡️</span>
          Resistances
        </h3>
        <TypeGrid>
          {Object.entries(analysis.resistances)
            .filter(([_, count]) => count > 0)
            .sort((a, b) => b[1] - a[1])
            .map(([type, count]) => (
              <TypeBadge key={type} color={getTypeColor(type)} count={count}>
                {type}
              </TypeBadge>
            ))}
        </TypeGrid>
      </Section>

      <Section>
        <h3>
          <span role="img" aria-label="no-entry" className="icon">⛔</span>
          Immunities
        </h3>
        <TypeGrid>
          {Object.entries(analysis.immunities)
            .filter(([_, count]) => count > 0)
            .sort((a, b) => b[1] - a[1])
            .map(([type, count]) => (
              <TypeBadge key={type} color={getTypeColor(type)} count={count}>
                {type}
              </TypeBadge>
            ))}
        </TypeGrid>
      </Section>
    </AnalysisContainer>
  );
}

export default TeamAnalysis; 