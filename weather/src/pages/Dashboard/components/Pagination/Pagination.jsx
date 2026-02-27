import "./Pagination.css";

export default function Pagination({ page, setPage, total }) {
  const totalPages = Math.max(1, Math.ceil(total / 10));

  return (
    <div className="pagination">
      <button
        className="page-btn"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>

      <span className="page-info">
        Page {page} of {totalPages}
      </span>

      <button
        className="page-btn"
        disabled={page >= totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
