import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchPokemonDetails,
  fetchPokemonSpecies,
  fetchEvolutionChain,
  fetchAbilityDetails,
} from "../service/pokeapi";
import { Pokemon, PokemonSpecies, EvolutionChain, Ability } from "../types/pokemon";
import "./PokemonDetails.css";

const PokemonDetails = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(null);
  const [abilities, setAbilities] = useState<Ability[]>([]);

  useEffect(() => {
    const loadDetails = async () => {
      if (!name) return;
      const pData = await fetchPokemonDetails(name);
      setPokemon(pData);

      const speciesData = await fetchPokemonSpecies(name);
      setSpecies(speciesData);

      if (speciesData.evolution_chain?.url) {
        const evoChain = await fetchEvolutionChain(speciesData.evolution_chain.url);
        setEvolutionChain(evoChain);
      }

      // Example: fetch details for first 2 moves as abilities (placeholder)
      const abilityPromises = pData.moves.slice(0, 2).map((moveObj) =>
        fetchAbilityDetails(`https://pokeapi.co/api/v2/ability/${moveObj.move.name}`)
      );
      try {
        const abilitiesData = await Promise.all(abilityPromises);
        setAbilities(abilitiesData);
      } catch (err) {
        console.error("Error fetching abilities", err);
      }
    };
    loadDetails();
  }, [name]);

  if (!pokemon) return <p>Loading Pokémon details...</p>;

  return (
    <>
      <div className="details-container">
        <div className="details-header">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="pokemon-image"
          />
          <h1 className="pokemon-name">{pokemon.name}</h1>
        </div>

        <div className="details-section">
          <div className="section-title">Stats</div>
          <ul className="stats-list">
            {pokemon.stats.map((stat) => (
              <li key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>

        {species && (
          <div className="details-section species-info">
            <div className="section-title">Species Information</div>
            <p>
              Habitat: {species.habitat ? species.habitat.name : "Unknown"} | Capture Rate: {species.capture_rate}
            </p>
            <p>
              {species.flavor_text_entries.find((entry) => entry.language.name === "en")?.flavor_text}
            </p>
          </div>
        )}

        {abilities.length > 0 && (
          <div className="details-section">
            <div className="section-title">Abilities</div>
            <ul className="abilities-list">
              {abilities.map((ability) => (
                <li key={ability.name}>
                  <strong>{ability.name}</strong>:{" "}
                  {ability.effect_entries.find((entry) => entry.language.name === "en")?.short_effect}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {evolutionChain && (
        <div className="evolution-container">
          <h3 className="evolution-title">Evolution Journey</h3>
          <EvolutionChainDisplay
            chain={evolutionChain.chain}
            currentPokemon={pokemon.name}
            isVertical={false}
          />
        </div>
      )}
    </>
  );
};

interface EvolutionChainDisplayProps {
  chain: {
    species: { name: string; url?: string };
    evolves_to: any[];
  };
  currentPokemon: string;
  isVertical?: boolean;
}

const EvolutionChainDisplay = ({
  chain,
  currentPokemon,
  isVertical = false,
}: EvolutionChainDisplayProps) => {
  const getPokemonId = (url?: string) => {
    if (!url) return "";
    const parts = url.split("/");
    return parts[parts.length - 2];
  };

  const isCurrentStage = chain.species.name.toLowerCase() === currentPokemon.toLowerCase();

  return (
    <div className={`evolution-journey ${isVertical ? "evolution-vertical" : ""}`}>
      <div className={`evolution-item ${isCurrentStage ? "current-stage" : ""}`}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getPokemonId(
            chain.species.url
          )}.png`}
          alt={chain.species.name}
        />
        <p className="evolution-name">{chain.species.name}</p>
      </div>
      {chain.evolves_to.length > 0 &&
        chain.evolves_to.map((evo, index) => (
          <EvolutionChainDisplay
            key={index}
            chain={evo}
            currentPokemon={currentPokemon}
            isVertical={isVertical}
          />
        ))}
    </div>
  );
};

export default PokemonDetails;
