// Type effectiveness chart
const typeChart = {
  normal: {
    weakTo: ['fighting'],
    resistantTo: [],
    immuneTo: ['ghost']
  },
  fighting: {
    weakTo: ['flying', 'psychic', 'fairy'],
    resistantTo: ['rock', 'bug', 'dark'],
    immuneTo: []
  },
  flying: {
    weakTo: ['rock', 'electric', 'ice'],
    resistantTo: ['fighting', 'bug', 'grass'],
    immuneTo: ['ground']
  },
  poison: {
    weakTo: ['ground', 'psychic'],
    resistantTo: ['fighting', 'poison', 'bug', 'grass', 'fairy'],
    immuneTo: []
  },
  ground: {
    weakTo: ['water', 'grass', 'ice'],
    resistantTo: ['poison', 'rock'],
    immuneTo: ['electric']
  },
  rock: {
    weakTo: ['fighting', 'ground', 'steel', 'water', 'grass'],
    resistantTo: ['normal', 'flying', 'poison', 'fire'],
    immuneTo: []
  },
  bug: {
    weakTo: ['flying', 'rock', 'fire'],
    resistantTo: ['fighting', 'ground', 'grass'],
    immuneTo: []
  },
  ghost: {
    weakTo: ['ghost', 'dark'],
    resistantTo: ['poison', 'bug'],
    immuneTo: ['normal', 'fighting']
  },
  steel: {
    weakTo: ['fighting', 'ground', 'fire'],
    resistantTo: ['normal', 'flying', 'rock', 'bug', 'steel', 'grass', 'psychic', 'ice', 'dragon', 'fairy'],
    immuneTo: ['poison']
  },
  fire: {
    weakTo: ['ground', 'rock', 'water'],
    resistantTo: ['bug', 'steel', 'fire', 'grass', 'ice', 'fairy'],
    immuneTo: []
  },
  water: {
    weakTo: ['grass', 'electric'],
    resistantTo: ['steel', 'fire', 'water', 'ice'],
    immuneTo: []
  },
  grass: {
    weakTo: ['flying', 'poison', 'bug', 'fire', 'ice'],
    resistantTo: ['ground', 'water', 'grass', 'electric'],
    immuneTo: []
  },
  electric: {
    weakTo: ['ground'],
    resistantTo: ['flying', 'steel', 'electric'],
    immuneTo: []
  },
  psychic: {
    weakTo: ['bug', 'ghost', 'dark'],
    resistantTo: ['fighting', 'psychic'],
    immuneTo: []
  },
  ice: {
    weakTo: ['fighting', 'rock', 'steel', 'fire'],
    resistantTo: ['ice'],
    immuneTo: []
  },
  dragon: {
    weakTo: ['ice', 'dragon', 'fairy'],
    resistantTo: ['fire', 'water', 'grass', 'electric'],
    immuneTo: []
  },
  dark: {
    weakTo: ['fighting', 'bug', 'fairy'],
    resistantTo: ['ghost', 'dark'],
    immuneTo: ['psychic']
  },
  fairy: {
    weakTo: ['poison', 'steel'],
    resistantTo: ['fighting', 'bug', 'dark'],
    immuneTo: ['dragon']
  }
};

function getPokemonTypes(pokemon) {
  if (!pokemon || !pokemon.types) return [];
  
  // Handle different Pokemon data structures
  if (Array.isArray(pokemon.types)) {
    return pokemon.types.map(typeData => {
      if (typeof typeData === 'string') {
        return typeData.toLowerCase();
      }
      if (typeData.type && typeData.type.name) {
        return typeData.type.name.toLowerCase();
      }
      return null;
    }).filter(Boolean);
  }
  
  return [];
}

export function analyzeTeamTypes(team) {
  // Initialize counters
  const weaknesses = {};
  const resistances = {};
  const immunities = {};
  const coverage = {};
  
  // Initialize all types
  Object.keys(typeChart).forEach(type => {
    weaknesses[type] = 0;
    resistances[type] = 0;
    immunities[type] = 0;
    coverage[type] = 0;
  });

  // Analyze each Pokemon in the team
  team.forEach(pokemon => {
    if (!pokemon) return;

    const pokemonTypes = getPokemonTypes(pokemon);
    if (pokemonTypes.length === 0) return;

    // Add offensive coverage
    pokemonTypes.forEach(type => {
      if (!typeChart[type]) return;
      Object.keys(typeChart).forEach(defendingType => {
        if (typeChart[defendingType].weakTo.includes(type)) {
          coverage[defendingType]++;
        }
      });
    });

    // Calculate defensive properties
    const pokemonWeaknesses = new Set();
    const pokemonResistances = new Set();
    const pokemonImmunities = new Set();

    // Check each attacking type against this Pokemon's types
    Object.keys(typeChart).forEach(attackingType => {
      let effectiveness = 1;

      pokemonTypes.forEach(defendingType => {
        if (!typeChart[defendingType]) return;
        
        if (typeChart[defendingType].weakTo.includes(attackingType)) {
          effectiveness *= 2;
        }
        if (typeChart[defendingType].resistantTo.includes(attackingType)) {
          effectiveness *= 0.5;
        }
        if (typeChart[defendingType].immuneTo.includes(attackingType)) {
          effectiveness = 0;
        }
      });

      if (effectiveness > 1) pokemonWeaknesses.add(attackingType);
      if (effectiveness < 1 && effectiveness > 0) pokemonResistances.add(attackingType);
      if (effectiveness === 0) pokemonImmunities.add(attackingType);
    });

    // Add to team totals
    pokemonWeaknesses.forEach(type => weaknesses[type]++);
    pokemonResistances.forEach(type => resistances[type]++);
    pokemonImmunities.forEach(type => immunities[type]++);
  });

  return {
    weaknesses,
    resistances,
    immunities,
    coverage
  };
}

export function getTypeColor(type) {
  const colors = {
    normal: '#A8A878',
    fighting: '#C03028',
    flying: '#A890F0',
    poison: '#A040A0',
    ground: '#E0C068',
    rock: '#B8A038',
    bug: '#A8B820',
    ghost: '#705898',
    steel: '#B8B8D0',
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    psychic: '#F85888',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#705848',
    fairy: '#EE99AC'
  };
  return colors[type] || '#888888';
} 