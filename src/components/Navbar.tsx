import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => (
  <nav className="navbar">
    <Link to="/" className="logo">Pokédex</Link>
  </nav>
);

export default Navbar;
