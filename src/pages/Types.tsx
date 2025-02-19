import { useState, useEffect } from "react";
import { fetchTypesList, fetchTypeDetails } from "../service/pokeapi";
import { TypeData } from "../types/pokemon";
import "./types.css";

const Types = () => {
  const [typesList, setTypesList] = useState<{ name: string }[]>([]);
  const [selectedType, setSelectedType] = useState<TypeData | null>(null);

  useEffect(() => {
    const loadTypes = async () => {
      const list = await fetchTypesList();
      setTypesList(list);
    };
    loadTypes();
  }, []);

  const handleTypeClick = async (typeName: string) => {
    const typeData = await fetchTypeDetails(typeName);
    setSelectedType(typeData);
  };

  return (
    <div className="types-page">
      <h1>Types</h1>
      <div className="types-list">
        {typesList.map((type) => (
          <button key={type.name} onClick={() => handleTypeClick(type.name)} className="type-button">
            {type.name}
          </button>
        ))}
      </div>
      {selectedType && (
        <div className="type-details">
          <h2>{selectedType.name}</h2>
          <div>
            <h3>Double Damage From:</h3>
            <ul>
              {selectedType.damage_relations.double_damage_from.map((d) => (
                <li key={d.name}>{d.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Double Damage To:</h3>
            <ul>
              {selectedType.damage_relations.double_damage_to.map((d) => (
                <li key={d.name}>{d.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Types;
