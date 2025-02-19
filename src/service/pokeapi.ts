import { Pokemon, PokemonSpecies, EvolutionChain, Ability, Move, TypeData, Item, Berry } from "../types/pokemon";

// Pokémon endpoints
export const fetchPokemonList = async (limit: number) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const data = await response.json();
  return data.results;
};

export const fetchPokemonDetails = async (name: string): Promise<Pokemon> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.json();
};

export const fetchPokemonSpecies = async (name: string): Promise<PokemonSpecies> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
  return response.json();
};

export const fetchEvolutionChain = async (url: string): Promise<EvolutionChain> => {
  const response = await fetch(url);
  return response.json();
};

export const fetchAbilityDetails = async (abilityUrl: string): Promise<Ability> => {
  const response = await fetch(abilityUrl);
  return response.json();
};

// Additional endpoints
export const fetchMoveDetails = async (moveName: string): Promise<Move> => {
  const response = await fetch(`https://pokeapi.co/api/v2/move/${moveName}`);
  return response.json();
};

export const fetchMovesList = async (limit: number = 20) => {
  const response = await fetch(`https://pokeapi.co/api/v2/move?limit=${limit}`);
  const data = await response.json();
  return data.results;
};

export const fetchTypeDetails = async (typeName: string): Promise<TypeData> => {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
  return response.json();
};

export const fetchTypesList = async () => {
  const response = await fetch(`https://pokeapi.co/api/v2/type`);
  const data = await response.json();
  return data.results;
};

export const fetchItemDetails = async (itemName: string): Promise<Item> => {
  const response = await fetch(`https://pokeapi.co/api/v2/item/${itemName}`);
  return response.json();
};

export const fetchItemsList = async (limit: number = 20) => {
  const response = await fetch(`https://pokeapi.co/api/v2/item?limit=${limit}`);
  const data = await response.json();
  return data.results;
};

export const fetchBerryDetails = async (berryName: string): Promise<Berry> => {
  const response = await fetch(`https://pokeapi.co/api/v2/berry/${berryName}`);
  return response.json();
};

export const fetchBerriesList = async (limit: number = 20) => {
  const response = await fetch(`https://pokeapi.co/api/v2/berry?limit=${limit}`);
  const data = await response.json();
  return data.results;
};
