import "./SearchSort.css";

export default function SearchSort({
  searchQuery,
  setSearchQuery,
  sortDirection,
  setSortField,
  setSortDirection,
}) {
  return (
    <div className="ss-container">
      <input
        type="text"
        className="ss-input"
        placeholder="Search by email..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="ss-row">
        <div className="ss-dropdown">
          <button className="ss-btn">Sort by</button>
          <div className="ss-dropdown-content">
            <button onClick={() => setSortField("id")}>ID</button>
            <button onClick={() => setSortField("email")}>Email</button>
          </div>
        </div>

        <div className="ss-dropdown">
          <button className="ss-btn">
            Direction: {sortDirection.toUpperCase()}
          </button>
          <div className="ss-dropdown-content">
            <button onClick={() => setSortDirection("asc")}>Asc</button>
            <button onClick={() => setSortDirection("desc")}>Desc</button>
          </div>
        </div>
      </div>
    </div>
  );
}
