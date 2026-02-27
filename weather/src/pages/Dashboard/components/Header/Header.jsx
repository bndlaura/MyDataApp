import "./Header.css";

export default function Header({ user, onLogout }) {
  return (
    <header className="dashboard-header">
      <div className="header-info">
        <h1>Admin Dashboard</h1>
        <p>Logged in as {user.email}</p>
      </div>

      <button className="logout-btn" onClick={onLogout}>
        Log out
      </button>
    </header>
  );
}
