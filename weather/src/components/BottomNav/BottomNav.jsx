import { Link } from "react-router-dom";
import "./BottomNav.css";

export default function BottomNav() {
  return (
    <div className="bottom-nav">
      <Link to="/contact" className="bottom-btn">Contact</Link>
      <Link to="/" className="bottom-btn">Login</Link>
    </div>
  );
}
