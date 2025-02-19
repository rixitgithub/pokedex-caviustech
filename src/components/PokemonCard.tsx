import { Link } from "react-router-dom";
import { Pokemon } from "../types/pokemon";
import "./PokemonCard.css";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => (
  <div className="pokemon-card">
    <div className="pokemon-types">
      {pokemon.types.map((typeObj) => (
        <span key={typeObj.type.name} className={`type-pill type-${typeObj.type.name}`}>
          {typeObj.type.name}
        </span>
      ))}
    </div>
    <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
    <h3>{pokemon.name}</h3>
    <Link to={`/pokemon/${pokemon.name}`} className="details-link">View Details</Link>
  </div>
);

export default PokemonCard;
