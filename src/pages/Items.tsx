import { useState, useEffect } from "react";
import { fetchItemsList, fetchItemDetails } from "../service/pokeapi";
import { Item } from "../types/pokemon";
import "./items.css";

const Items = () => {
  const [itemsList, setItemsList] = useState<{ name: string }[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    const loadItems = async () => {
      const list = await fetchItemsList(20);
      setItemsList(list);
    };
    loadItems();
  }, []);

  const handleItemClick = async (itemName: string) => {
    const itemData = await fetchItemDetails(itemName);
    setSelectedItem(itemData);
  };

  return (
    <div className="items-page">
      <h1>Items</h1>
      <div className="items-list">
        {itemsList.map((item) => (
          <button key={item.name} onClick={() => handleItemClick(item.name)} className="item-button">
            {item.name}
          </button>
        ))}
      </div>
      {selectedItem && (
        <div className="item-details">
          <h2>{selectedItem.name}</h2>
          <p>Cost: {selectedItem.cost}</p>
          <p>
            Effect:{" "}
            {selectedItem.effect_entries.find((entry) => entry.language.name === "en")?.effect}
          </p>
        </div>
      )}
    </div>
  );
};

export default Items;
