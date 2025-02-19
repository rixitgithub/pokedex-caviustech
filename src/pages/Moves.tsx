import { useState, useEffect } from "react";
import { fetchMovesList, fetchMoveDetails } from "../service/pokeapi";
import { Move } from "../types/pokemon";
import "./moves.css";

const Moves = () => {
  const [movesList, setMovesList] = useState<{ name: string }[]>([]);
  const [selectedMove, setSelectedMove] = useState<Move | null>(null);

  useEffect(() => {
    const loadMoves = async () => {
      const list = await fetchMovesList(20);
      setMovesList(list);
    };
    loadMoves();
  }, []);

  const handleMoveClick = async (moveName: string) => {
    const moveData = await fetchMoveDetails(moveName);
    setSelectedMove(moveData);
  };

  return (
    <div className="moves-page">
      <h1>Moves</h1>
      <div className="moves-list">
        {movesList.map((move) => (
          <button key={move.name} onClick={() => handleMoveClick(move.name)} className="move-button">
            {move.name}
          </button>
        ))}
      </div>
      {selectedMove && (
        <div className="move-details">
          <h2>{selectedMove.name}</h2>
          <p>Power: {selectedMove.power ?? "N/A"}</p>
          <p>Accuracy: {selectedMove.accuracy ?? "N/A"}</p>
          <p>PP: {selectedMove.pp}</p>
          <p>
            Effect:{" "}
            {selectedMove.effect_entries.find((entry) => entry.language.name === "en")?.short_effect}
          </p>
        </div>
      )}
    </div>
  );
};

export default Moves;
