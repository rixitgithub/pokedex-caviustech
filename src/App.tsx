import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import PokemonDetails from "./pages/PokemonDetails";
import Moves from "./pages/Moves";
import Types from "./pages/Types";
import Items from "./pages/Items";
import Navbar from "./components/Navbar";
import "./assets/styles/main.css";

const App = () => (
  <div className="app-container">
    <Navbar />
    <nav className="secondary-nav">
      <Link to="/">Home</Link>
      <Link to="/moves">Moves</Link>
      <Link to="/types">Types</Link>
      <Link to="/items">Items</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon/:name" element={<PokemonDetails />} />
      <Route path="/moves" element={<Moves />} />
      <Route path="/types" element={<Types />} />
      <Route path="/items" element={<Items />} />
    </Routes>
    <footer className="app-footer">
      Made by Rishit Tiwari for Cavius Technologies
    </footer>
  </div>
);

export default App;
