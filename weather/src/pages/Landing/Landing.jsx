import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault(); 

    const result = await dispatch(loginUser({ email, password }));

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }
  }

  return (
    <div className="landing-wrapper">
      <div className="landing-content">

        <img src="/assets/images/weather.png" className="landing-logo" />

        <h1 className="landing-title">Weatherly</h1>

        <p className="landing-subtitle">
          A beautifully simple way to explore weather forecasts around the world.
        </p>

        <form className="soft-login" onSubmit={handleLogin}>
          <p className="soft-login-label">Admin access</p>

          <input 
            type="email"
            placeholder="Email"
            className="soft-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input 
            type="password"
            placeholder="Password"
            className="soft-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />

          <button 
            className="soft-login-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Log in"}
          </button>

          {error && (
            <p className="error-text">
              {error}
            </p>
          )}
        </form>

        <div className="divider">or</div>

        <Link to="/home" className="cta-secondary">
          Continue without login
        </Link>
      </div>
    </div>
  );
}
