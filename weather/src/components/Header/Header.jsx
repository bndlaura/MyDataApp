import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-center">
        <img 
          src="/assets/images/weather.png" 
          alt="logo" 
          className="header-logo"
        />
        <span className="header-title">Weatherly</span>
      </div>

      <nav className="header-nav">
        <Link to="/contact" className="nav-link">Contact</Link>
        <Link to="/" className="nav-link">Login</Link>
      </nav>
    </header>
  );
}
