import { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard";
import { fetchPokemonList, fetchPokemonDetails } from "../service/pokeapi";
import { Pokemon } from "../types/pokemon";
import "./Home.css";

const Home = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 18;

  useEffect(() => {
    const loadPokemon = async () => {
      setLoading(true);
      const list = await fetchPokemonList(151);
      const details = await Promise.all(list.map((p) => fetchPokemonDetails(p.name)));
      setPokemonList(details);
      setLoading(false);
    };
    loadPokemon();
  }, []);

  // Filter Pokémon based on search term
  const filteredPokemon = pokemonList.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination indices
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPokemon = filteredPokemon.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="home">
        <div className="search">
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        className="search-box"
      />
</div>
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <>
          <div className="pokemon-grid">
            {currentPokemon.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
