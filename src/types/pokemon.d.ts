export interface Pokemon {
    id: number;
    name: string;
    types: Array<{ slot: number; type: { name: string } }>;
    sprites: {
      front_default: string;
      other: {
        "official-artwork": { front_default: string };
      };
    };
    stats: Array<{ base_stat: number; stat: { name: string } }>;
    moves: Array<{ move: { name: string } }>;
  }
  
  export interface PokemonSpecies {
    evolution_chain: { url: string };
    flavor_text_entries: Array<{
      flavor_text: string;
      language: { name: string };
    }>;
    habitat: { name: string } | null;
    capture_rate: number;
  }
  
  export interface EvolutionChain {
    chain: EvolutionLink;
  }
  
  export interface EvolutionLink {
    species: { name: string; url: string };
    evolves_to: EvolutionLink[];
  }
  
  export interface Ability {
    name: string;
    effect_entries: Array<{
      effect: string;
      short_effect: string;
      language: { name: string };
    }>;
  }
  
  export interface Move {
    name: string;
    power: number | null;
    accuracy: number | null;
    pp: number;
    type: { name: string };
    effect_entries: Array<{
      effect: string;
      short_effect: string;
      language: { name: string };
    }>;
  }
  
  export interface TypeData {
    name: string;
    damage_relations: {
      double_damage_from: Array<{ name: string }>;
      double_damage_to: Array<{ name: string }>;
      half_damage_from: Array<{ name: string }>;
      half_damage_to: Array<{ name: string }>;
      no_damage_from: Array<{ name: string }>;
      no_damage_to: Array<{ name: string }>;
    };
  }
  
  export interface Item {
    name: string;
    cost: number;
    attributes: Array<{ name: string }>;
    effect_entries: Array<{ effect: string; language: { name: string } }>;
  }
  
  export interface Berry {
    name: string;
    growth_time: number;
    size: number;
    max_harvest: number;
    firmness: { name: string };
    flavor: Array<{ flavor: { name: string }; potency: number }>;
  }
  